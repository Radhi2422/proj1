const request = require("supertest");
const app = require("../app");

describe("Product API", () => {

    test("GET /api/products", async () => {

        const response =
            await request(app)
                .get("/api/products");

        expect(response.statusCode).toBe(200);
    });

});