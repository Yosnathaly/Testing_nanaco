const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it ("Obteniendo cafes", async () =>{
        const {statusCode, body: cafes} = await request(server).get("/cafes").send()
        expect(statusCode).toBe(200)
        expect(cafes).toBeInstanceOf(Array)
        expect(cafes.length).toBeGreaterThanOrEqual(1)
    })
    it ("Eliminar con id inexistente", async () =>{
        const token = "token"
        const idTest = 55544554573757537
        const {statusCode} = await request(server).delete(`/cafes/${idTest}`).set("Authorization", token).send();
        expect(statusCode).toBe(404)
    })
    it ("agregar cafe", async() => {
        const element = {
            id: 8,
            nombre: "Cafe con leche"
        }
        const {statusCode, body} = await request(server).post("/cafes").send(element)
        expect(statusCode).toBe(201)
        expect(body).toContainEqual(element)
        })

        it("actualizar cafe", async() => {
            const id = 2
            const nuevoCafe = {id,nombre: "Cafe con leche de almendras"}
            const {statusCode, body} = await request(server).put(`/cafes/${id}`).send(nuevoCafe)    
            expect (body).toContainEqual(nuevoCafe)
            expect(statusCode).toBe(200)
        })

})

