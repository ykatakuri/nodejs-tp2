import supertest from "supertest";
import { app } from "./app.js";

describe("app", () => {
  describe("match", () => {
    const match = { id: "1", team1: "Team 1", team2: "Team 2", score: 10 };
    describe("findAll", () => {
      it("should respond with success", async () => {
        const response = await supertest(app).get("/matches");
        expect(response).toBeTruthy();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(12);
        expect(typeof response.body[0]).toBe("object");
        expect(typeof response.body[0].id).toBe("number");
        expect(typeof response.body[0].team1).toBe("string");
        expect(typeof response.body[0].team2).toBe("string");
        expect(typeof response.body[0].score).toBe("number");
        expect(typeof response.body[0].date).toBe("date");
      });
    });
    describe("findById", () => {
      it("should respond with success", (done) => {
        const expectedResponse = {
          ...match,
        };
        supertest(app)
          .get("/matches/1")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res.body).toEqual(expectedResponse);
            done();
          });
      });
      it("should respond with not found", (done) => {
        supertest(app)
          .get("/matches/100")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .end((err, res) => {
            expect(res.body).toEqual({
              code: 404,
              details: "Match not found",
            });
            done();
          });
      });
    });
    describe("create", () => {
      it("should respond with success", (done) => {
        const expectedResponse = {
          ...match,
        };
        supertest(app)
          .post("/matches")
          .auth("admin", "admin")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send(match)
          .expect(200)
          .end((err, res) => {
            expect(res.body).toEqual(expectedResponse);
            done();
          });
      });
      it("should respond with bad request", async (done) => {
        const expectedResponse = {
          code: 400,
          details: "Bad request",
        };
        const res = await supertest(app)
          .post("/matches")
          .auth("admin", "admin")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send({})
          .expect(400);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
      it("should respond with unauthorized user", (done) => {
        const expectedResponse = {
          ...match,
        };
        supertest(app)
          .post("/matches")
          .auth("guest", "guest")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send(match)
          .expect(401)
          .end((err, res) => {
            expect(res.body).toEqual({
              code: 401,
              details: "Unauthorized user",
            });
            done();
          });
      });
    });
    describe("replace", () => {
      it("should respond with success", (done) => {
        const updatedMatch = {
          ...match,
          team1: "Team 1 updated",
          team2: "Team 2 updated",
          score: 20,
        };

        const expectedResponse = {
          ...match,
          ...updatedMatch,
        };
        supertest(app)
          .put("/matches/1")
          .auth("admin", "admin")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send(updatedMatch)
          .expect(200)
          .end((err, res) => {
            expect(res.body).toEqual(expectedResponse);
            done();
          });
      });
      it("should respond with not found", (done) => {
        supertest(app)
          .put("/matches/100")
          .auth("admin", "admin")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send({})
          .expect(404)
          .end((err, res) => {
            expect(res.body).toEqual({
              code: 404,
              details: "Match not found",
            });
            done();
          });
      });
      it("should respond with bad request", async (done) => {
        const expectedResponse = {
          code: 400,
          details: "Bad request",
        };
        const res = await supertest(app)
          .put("/matches/1")
          .auth("admin", "admin")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send({})
          .expect(400);
        expect(res.body).toEqual(expectedResponse);
        done();
      });
      it("should respond with unauthorized user", (done) => {
        const expectedResponse = {
          ...match,
        };
        supertest(app)
          .put("/matches/1")
          .auth("guest", "guest")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send(match)
          .expect(401)
          .end((err, res) => {
            expect(res.body).toEqual({
              code: 401,
              details: "Unauthorized user",
            });
            done();
          });
        describe("update", () => {
          it("should respond with success", (done) => {
            const updatedMatch = {
              ...match,
              team1: "Team 1 updated",
              team2: "Team 2 updated",
              score: 20,
            };

            const expectedResponse = {
              ...match,
              ...updatedMatch,
            };
            supertest(app)
              .patch("/matches/1")
              .auth("admin", "admin")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .send(updatedMatch)
              .expect(200)
              .end((err, res) => {
                expect(res.body).toEqual(expectedResponse);
                done();
              });
          });
          it("should respond with not found", (done) => {
            supertest(app)
              .patch("/matches/100")
              .auth("admin", "admin")
              .send({})
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(404)
              .end((err, res) => {
                expect(res.body).toEqual({
                  code: 404,
                  details: "Match not found",
                });
                done();
              });
          });
          it("should respond with bad request", async (done) => {
            const expectedResponse = {
              code: 400,
              details: "Bad request",
            };
            const res = await supertest(app)
              .patch("/matches/1")
              .auth("admin", "admin")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .send({})
              .expect(400);
            expect(res.body).toEqual(expectedResponse);
            done();
          });
          it("should respond with unauthorized user", (done) => {
            const expectedResponse = {
              ...match,
            };
            supertest(app)
              .patch("/matches/1")
              .auth("guest", "guest")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .send(match)
              .expect(401)
              .end((err, res) => {
                expect(res.body).toEqual({
                  code: 401,
                  details: "Unauthorized user",
                });
                done();
              });
            describe("delete", () => {
              it("should respond with success", (done) => {
                supertest(app)
                  .delete("/matches/1")
                  .auth("admin", "admin")
                  .set("Accept", "application/json")
                  .expect("Content-Type", /json/)
                  .expect(200)
                  .end((err, res) => {
                    expect(res.body).toEqual({
                      code: 200,
                      details: "Match deleted",
                    });
                    done();
                  });
              });
              it("should respond with not found", (done) => {
                supertest(app)
                  .delete("/matches/100")
                  .auth("admin", "admin")
                  .set("Accept", "application/json")
                  .expect("Content-Type", /json/)
                  .expect(404)
                  .end((err, res) => {
                    expect(res.body).toEqual({
                      code: 404,
                      details: "Match not found",
                    });
                    done();
                  });
              });
              it("should respond with unauthorized user", (done) => {
                supertest(app)
                  .delete("/matches/1")
                  .auth("contributor", "contributor")
                  .set("Accept", "application/json")
                  .expect("Content-Type", /json/)
                  .expect(401)
                  .end((err, res) => {
                    expect(res.body).toEqual({
                      code: 401,
                      details: "Unauthorized user",
                    });
                    done();
                  });
              });
            });
          });
        });
      });
    });
  });
});
