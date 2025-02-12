import request from "supertest";
import { app } from "../app";

describe("Admin CRUD Operations", () => {
  let token: string;

  beforeAll(async () => {
    // Get JWT token after logging in as admin
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "password" });
    token = res.body.token;
  });

  it("should create a new grocery", async () => {
    const res = await request(app)
      .post("/admin/groceries")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Apple", price: 1.5, stock: 100 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Apple");
  });

  it("should update an existing grocery", async () => {
    const res = await request(app)
      .put("/admin/groceries/1")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Orange", price: 1.2, stock: 150 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Orange");
  });

  it("should delete a grocery", async () => {
    const res = await request(app)
      .delete("/admin/groceries/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
