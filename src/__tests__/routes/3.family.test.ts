import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { ITestHealthAgent } from "../../interfaces/healthAgent";
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

  const createAddress1 = await request(app)
    .post("/address")
    .send(address1)
    .set("Authorization", `Bearer ${healthAgent1.token}`);

  address1.id = createAddress1.body.id;
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

describe("Creating a family", () => {
  test("Should create a family", async () => {
    const response = await request(app)
      .post("/family")
      .send({
        name: "family",
        address_id: address1.id,
      })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(201);
  });
});
