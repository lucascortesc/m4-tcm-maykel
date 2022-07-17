import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { ITestHealthAgent } from "../../interfaces/healthAgent";

let connection: DataSource;

beforeAll(async () => {
  await AppDataSource.initialize()
    .then((res) => {
      connection = res;
    })
    .catch((err) => {
      console.error("Error during DataSource initialization", err);
    });
});

afterAll(async () => {
  await connection.destroy();
});

const healthAgent1: ITestHealthAgent = {
  name: "agent 1",
  password: "abC123!@#",
  email: "agent1@mail.com",
};

const loginAgent1 = {
  password: "abC123!@#",
  email: "agent1@mail.com",
};

const healthAgent2: ITestHealthAgent = {
  name: "agent 2",
  password: "abC123!@#",
  email: "agent2@mail.com",
};

describe("Creating an agent", () => {
  test("Should create an agent", async () => {
    const response = await request(app).post("/register").send(healthAgent1);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");

    healthAgent1.id = response.body.id;
  });

  test("Should return an error for agent with missing field", async () => {
    const response = await request(app).post("/register").send({
      password: "abC123!@#",
      email: "agent1@mail.com",
    });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("name is required on body request");
  });

  test("Should return email already exists", async () => {
    const response = await request(app).post("/register").send(healthAgent1);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("e-mail already exists");
  });

  test("Should return an error for weak password", async () => {
    const response = await request(app).post("/register").send({
      name: "agent 1",
      password: "123456",
      email: "agent2@mail.com",
    });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual(
      "password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character"
    );
  });
});

describe("Testing login", () => {
  test("Should be able to login", async () => {
    const response = await request(app).post("/login").send(loginAgent1);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("token");

    healthAgent1.token = response.body.token;
  });

  test("Sould return an error for a non-existing agent", async () => {
    const response = await request(app).post("/login").send({ email: "agent@mail.com", password: "123" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid credentials");
  });
});

describe("Listing the agent", () => {
  test("Should list an authenticated agent", async () => {
    const response = await request(app).get("/agent").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toEqual(healthAgent1.id);
    expect(response.body.name).toEqual(healthAgent1.name);
    expect(response.body.email).toEqual(healthAgent1.email);
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get("/agent").set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Updating an agent", () => {
  test("Should update an authenticated agent", async () => {
    const response = await request(app)
      .patch("/agent")
      .send({ name: "Updated agent" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Updated agent");
  });

  test("Should return an error when trying to change agent id", async () => {
    const response = await request(app)
      .patch("/agent")
      .send({ id: 1 })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the agent id");
  });

  test("Should return an error when trying to change isactive", async () => {
    const response = await request(app)
      .patch("/agent")
      .send({ isactive: false })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Use the method delete to inactivate the agent");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).patch("/agent").send({ id: 1 }).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Deleting an agent", () => {
  test("Should soft delete an authenticated agent", async () => {
    const response = await request(app).delete("/agent").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("User deleted with success");

    const loginUser = await request(app).post("/login").send(loginAgent1);
    expect(loginUser.status).toEqual(200);
    healthAgent1.token = loginUser.body.token;

    const updatedUser = await request(app).get("/agent").set("Authorization", `Bearer ${healthAgent1.token}`);
    expect(updatedUser.body).toHaveProperty("error");
    expect(updatedUser.body.error).toEqual("User inactive");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).delete("/agent").set("Authorization", `Bearer fakeTOken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });

  test("Should return an error when an inactivated agent try to use any route", async () => {
    const response = await request(app).patch("/agent").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("User inactive");
  });
});
