import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { ITestHealthAgent } from "../../interfaces/healthAgent";
import { IUpdateAddress } from "../../interfaces/address";
import { IUpdateHomeVisit } from "../../interfaces/homeVisit";

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
  address1.agent_id = healthAgent1.id;

  visit.address_id = address1.id;
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

const visit: IUpdateHomeVisit = {
  status: "scheduled visit",
  message: "wating visit",
};

describe("Creating a visit", () => {
  test("Should create a visit", async () => {
    const response = await request(app)
      .post("/visits")
      .send(visit)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");

    visit.id = response.body.id;
  });

  test("Should return an error when agent is not the owner of the address", async () => {
    const response = await request(app)
      .post("/visits")
      .send(visit)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to address");
  });

  test("Should return an error for visit with missing field", async () => {
    const response = await request(app)
      .post("/visits")
      .send({
        status: "scheduled visit",
        address_id: address1.id,
      })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Message is required on body request");
  });

  test("Should return address not found", async () => {
    const response = await request(app)
      .post("/visits")
      .send({
        status: "scheduled visit",
        message: "wating visit",
        address_id: "a8398c9a-12b3-4384-9415-b550c9dda6df",
      })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Address not found");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).post("/visits").send(visit).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Listing all visits of an agent", () => {
  test("Should return all visits for an agent", async () => {
    const response = await request(app).get("/visits").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual(visit.id);
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get("/visits");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Missing token");
  });
});

describe("Listing a specific visit", () => {
  test("Should return a specific visit", async () => {
    const response = await request(app).get(`/visits/${visit.id}`).set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(visit.id);
    expect(response.body.address_id).toEqual(address1.id);
    expect(response.body.agent_id).toEqual(healthAgent1.id);
  });

  test("Should return visit not found", async () => {
    const response = await request(app)
      .get(`/visits/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Visit not found");
  });

  test("Should return an error when agent is not the owner of the visit", async () => {
    const response = await request(app).get(`/visits/${visit.id}`).set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to visit");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get(`/visits/${visit.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Updating a visit", () => {
  test("Should update a visit", async () => {
    const response = await request(app)
      .patch(`/visits/${visit.id}`)
      .send({ message: "Visit updated" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body.message).toEqual("Visit updated");
  });

  test("Should return visit not found", async () => {
    const response = await request(app)
      .patch(`/visits/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .send({ message: "visit updated" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Visit not found");
  });

  test("Should return an error when trying to update visit id", async () => {
    const response = await request(app)
      .patch(`/visits/${visit.id}`)
      .send({ id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the visit id");
  });

  test("Should return an error when trying to update address id", async () => {
    const response = await request(app)
      .patch(`/visits/${visit.id}`)
      .send({ address_id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the address id");
  });

  test("Should return an error when agent is not the owner of the visit", async () => {
    const response = await request(app)
      .patch(`/visits/${visit.id}`)
      .send({ message: "visit updated" })
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to address");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app)
      .patch(`/visits/${visit.id}`)
      .send({ name: "pacient updated" })
      .set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Deleting a visit", () => {
  test("Should return an error when agent is not the owner of the visit", async () => {
    const response = await request(app)
      .delete(`/visits/${visit.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to visit");
  });

  test("Should return pacient not found", async () => {
    const response = await request(app)
      .delete(`/visits/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Visit not found");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).delete(`/visits/${visit.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });

  test("Should delete an visit", async () => {
    const response = await request(app)
      .delete(`/visits/${visit.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Visit deleted with success");
  });
});
