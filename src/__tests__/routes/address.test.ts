import { ITestHealthAgent } from "../../interfaces/healthAgent";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { IUpdateAddress } from "../../interfaces/address";

let connection: DataSource;

beforeAll(async () => {
  await AppDataSource.initialize()
    .then((res) => {
      connection = res;
    })
    .catch((err) => {
      console.error("Error during DataSource initialization", err);
    });

  const createAgent1 = await request(app).post("/register").send(healthAgent1);
  const createAgent2 = await request(app).post("/register").send(healthAgent2);
  healthAgent1.id = createAgent1.body.id;
  healthAgent2.id = createAgent2.body.id;

  const tokenAgent1 = await request(app).post("/login").send(loginAgent1);
  healthAgent1.token = tokenAgent1.body.token;

  const tokenAgent2 = await request(app).post("/login").send(loginAgent2);
  healthAgent2.token = tokenAgent2.body.token;
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
  email: "agent1@mail.com",
  password: "abC123!@#",
};

const healthAgent2: ITestHealthAgent = {
  name: "agent 2",
  password: "abC123!@#",
  email: "agent2@mail.com",
};

const loginAgent2 = {
  email: "agent2@mail.com",
  password: "abC123!@#",
};

const address1: IUpdateAddress = {
  state: "DF",
  city: "city test",
  number: 3000,
  cep: "87820000",
  street: "street test",
};

describe("Creating an address", () => {
  test("Should create an address", async () => {
    const response = await request(app)
      .post("/address")
      .send(address1)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");

    address1.id = response.body.id;
  });

  test("Should return an error for address with missing field", async () => {
    const response = await request(app)
      .post("/address")
      .send({ state: "DF", city: "city test", number: 3000, cep: "87820000" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("street is required on body request");
  });

  test("Should return address already exists", async () => {
    const response = await request(app)
      .post("/address")
      .send(address1)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address already exists");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).post("/address").send(address1).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Listing all address of an agent", () => {
  test("Should return all address for an agent", async () => {
    const response = await request(app).get("/address").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual(address1.id);
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get("/address");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Missing token");
  });
});

describe("Listing a specific address", () => {
  test("Should return a specific address", async () => {
    const response = await request(app)
      .get(`/address/${address1.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(address1.id);
    expect(response.body.agent_id).toEqual(healthAgent1.id);
  });

  test("Should return address not found", async () => {
    const response = await request(app)
      .get(`/address/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address not found");
  });

  test("Should return an error when agent is not the owner of the address", async () => {
    const response = await request(app)
      .get(`/address/${address1.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to address");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get(`/address/${address1.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Updating an address", () => {
  test("Should update an address", async () => {
    const response = await request(app)
      .patch(`/address/${address1.id}`)
      .send({ number: 3001 })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.number).toEqual(3001);
  });

  test("Should return address does not exists", async () => {
    const response = await request(app)
      .patch(`/address/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .send({ number: 3001 })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address does not exists");
  });

  test("Should return an error when trying to update address id", async () => {
    const response = await request(app)
      .patch(`/address/${address1.id}`)
      .send({ id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the address id");
  });

  test("Should return an error when trying to update agent id", async () => {
    const response = await request(app)
      .patch(`/address/${address1.id}`)
      .send({ agent_id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the agent id");
  });

  test("Should return an error when agent is not the owner of the address", async () => {
    const response = await request(app)
      .patch(`/address/${address1.id}`)
      .send({ number: 3001 })
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to address");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app)
      .patch(`/address/${address1.id}`)
      .send({ number: 3001 })
      .set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Deleting an address", () => {
  test("Should return an error when agent is not the owner of the address", async () => {
    const response = await request(app)
      .delete(`/address/${address1.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to address");
  });

  test("Should return address does not exists", async () => {
    const response = await request(app)
      .delete(`/address/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address does not exists");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).delete(`/address/${address1.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });

  test("Should delete an address", async () => {
    const response = await request(app)
      .delete(`/address/${address1.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("address deleted with success");
  });
});
