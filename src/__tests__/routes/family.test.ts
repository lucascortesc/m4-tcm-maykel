import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { ITestHealthAgent } from "../../interfaces/healthAgent";
import { IUpdateAddress } from "../../interfaces/address";
import { iUpdateFamily } from "../../interfaces/family";

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

  const createAddress1 = await request(app)
    .post("/address")
    .send(address1)
    .set("Authorization", `Bearer ${healthAgent1.token}`);

  address1.id = createAddress1.body.id;
  family.address_id = address1.id;
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

const family: iUpdateFamily = {
  name: "family",
};

describe("Creating a family", () => {
  test("Should create a family", async () => {
    const response = await request(app)
      .post("/family")
      .send(family)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");

    family.id = response.body.id;
  });

  test("Should return an error when agent is not the owner of the address", async () => {
    const response = await request(app)
      .post("/family")
      .send(family)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to address");
  });

  test("Should return an error for family with missing field", async () => {
    const response = await request(app)
      .post("/family")
      .send({ name: "family" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address_id is required on body request");
  });

  test("Should return address already has a registered family", async () => {
    const response = await request(app)
      .post("/family")
      .send(family)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address already has a registered family");
  });

  test("Should return address not found", async () => {
    const response = await request(app)
      .post("/family")
      .send({ name: "family", address_id: "a8398c9a-12b3-4384-9415-b550c9dda6df" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("address not found");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).post("/family").send(family).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Listing all families of an agent", () => {
  test("Should return all families for an agent", async () => {
    const response = await request(app).get("/family").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual(family.id);
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get("/family");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Missing token");
  });
});

describe("Listing a specific family", () => {
  test("Should return a specific family", async () => {
    const response = await request(app)
      .get(`/family/${family.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(family.id);
    expect(response.body.address_id).toEqual(address1.id);
  });

  test("Should return family not found", async () => {
    const response = await request(app)
      .get(`/family/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("family not found");
  });

  test("Should return an error when agent is not the owner of the family", async () => {
    const response = await request(app)
      .get(`/family/${family.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to family");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get(`/family/${family.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Updating a family", () => {
  test("Should update a family", async () => {
    const response = await request(app)
      .patch(`/family/${family.id}`)
      .send({ name: "family updated" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("family updated");
  });

  test("Should return family not found", async () => {
    const response = await request(app)
      .patch(`/family/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .send({ name: "family updated" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("family not found");
  });

  test("Should return an error when trying to update family id", async () => {
    const response = await request(app)
      .patch(`/family/${family.id}`)
      .send({ id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("you can't change the family id");
  });

  test("Should return an error when trying to update address id", async () => {
    const response = await request(app)
      .patch(`/family/${family.id}`)
      .send({ address_id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("you can't change the address id");
  });

  test("Should return an error when agent is not the owner of the family", async () => {
    const response = await request(app)
      .patch(`/family/${family.id}`)
      .send({ number: 3001 })
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to family");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app)
      .patch(`/family/${family.id}`)
      .send({ name: "family updated" })
      .set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Deleting a family", () => {
  test("Should return an error when agent is not the owner of the family", async () => {
    const response = await request(app)
      .delete(`/family/${family.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to family");
  });

  test("Should return family not found", async () => {
    const response = await request(app)
      .delete(`/family/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("family not found");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).delete(`/family/${family.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });

  test("Should delete an family", async () => {
    const response = await request(app)
      .delete(`/family/${family.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("family deleted with success");
  });
});
