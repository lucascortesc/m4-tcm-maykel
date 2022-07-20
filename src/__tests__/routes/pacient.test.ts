import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { ITestHealthAgent } from "../../interfaces/healthAgent";
import { IUpdateAddress } from "../../interfaces/address";
import { iUpdateFamily } from "../../interfaces/family";
import { IUpdatePacient } from "../../interfaces/pacient";

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
  family.address_id = address1.id;

  const createFamily = await request(app)
    .post("/family")
    .send(family)
    .set("Authorization", `Bearer ${healthAgent1.token}`);

  family.id = createFamily.body.id;
  pacient.family_id = family.id;
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

const pacient: IUpdatePacient = {
  cpf: "12345678911",
  name: "Pacient",
  last_name: "last_name1",
  age: 30,
  tel: "99999999",
  is_owner: true,
};

describe("Creating a pacient", () => {
  test("Should create a pacient", async () => {
    const response = await request(app)
      .post("/pacient")
      .send(pacient)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");

    pacient.id = response.body.id;
  });

  test("Should return an error when agent is not the owner of the family", async () => {
    const response = await request(app)
      .post("/pacient")
      .send(pacient)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to family");
  });

  test("Should return an error for pacient with missing field", async () => {
    const response = await request(app)
      .post("/pacient")
      .send({
        cpf: "12345678911",
        name: "Pacient",
        last_name: "last_name1",
        tel: "99999999",
        is_owner: true,
        family_id: "a8398c9a-12b3-4384-9415-b550c9dda6df",
      })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Age is required on body request");
  });

  test("Should return pacient already exists", async () => {
    const response = await request(app)
      .post("/pacient")
      .send(pacient)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Pacient already exists");
  });

  test("Should return family not found", async () => {
    const response = await request(app)
      .post("/pacient")
      .send({
        cpf: "12345678911",
        name: "Pacient",
        last_name: "last_name1",
        age: 30,
        tel: "99999999",
        is_owner: true,
        family_id: "a8398c9a-12b3-4384-9415-b550c9dda6df",
      })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Family not found");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).post("/pacient").send(pacient).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Listing all pacients of an agent", () => {
  test("Should return all pacients for an agent", async () => {
    const response = await request(app).get("/pacient").set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toEqual(pacient.id);
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get("/pacient");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Missing token");
  });
});

describe("Listing a specific pacient", () => {
  test("Should return a specific pacient", async () => {
    const response = await request(app)
      .get(`/pacient/${pacient.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(pacient.id);
    expect(response.body.family_id).toEqual(family.id);
  });

  test("Should return pacient not found", async () => {
    const response = await request(app)
      .get(`/pacient/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Pacient not found");
  });

  test("Should return an error when agent is not the owner of the pacient", async () => {
    const response = await request(app)
      .get(`/pacient/${pacient.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to pacient");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).get(`/pacient/${pacient.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Updating a pacient", () => {
  test("Should update a pacient", async () => {
    const response = await request(app)
      .patch(`/pacient/${pacient.id}`)
      .send({ name: "Pacient updated" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Pacient updated");
  });

  test("Should return pacient not found", async () => {
    const response = await request(app)
      .patch(`/pacient/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .send({ name: "pacient updated" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Pacient not found");
  });

  test("Should return an error when trying to update pacient id", async () => {
    const response = await request(app)
      .patch(`/pacient/${pacient.id}`)
      .send({ id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the pacient id");
  });

  test("Should return an error when trying to update family id", async () => {
    const response = await request(app)
      .patch(`/pacient/${pacient.id}`)
      .send({ family_id: "1e7126af-f130-6780-adb4-8bbe7368fc2f" })
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("You can't change the family id");
  });

  test("Should return an error when agent is not the owner of the pacient", async () => {
    const response = await request(app)
      .patch(`/pacient/${pacient.id}`)
      .send({ name: "pacient updated" })
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to pacient");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app)
      .patch(`/pacient/${pacient.id}`)
      .send({ name: "pacient updated" })
      .set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });
});

describe("Deleting a pacient", () => {
  test("Should return an error when agent is not the owner of the pacient", async () => {
    const response = await request(app)
      .delete(`/pacient/${pacient.id}`)
      .set("Authorization", `Bearer ${healthAgent2.token}`);

    expect(response.status).toEqual(403);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Agent does not have access to pacient");
  });

  test("Should return pacient not found", async () => {
    const response = await request(app)
      .delete(`/pacient/1e7126af-f130-6780-adb4-8bbe7368fc2f`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Pacient not found");
  });

  test("Should return an error for an unauthenticated agent", async () => {
    const response = await request(app).delete(`/pacient/${pacient.id}`).set("Authorization", `Bearer fakeToken`);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Invalid token");
  });

  test("Should delete an pacient", async () => {
    const response = await request(app)
      .delete(`/pacient/${pacient.id}`)
      .set("Authorization", `Bearer ${healthAgent1.token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Pacient deleted with success");
  });
});
