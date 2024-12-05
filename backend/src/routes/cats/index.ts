import {FastifyInstance, FastifyPluginAsync, FastifyPluginOptions} from "fastify"
import {query} from "../../services/database.js"
import {CatPostSchema, CatPostType, CatsSchema} from "../../types/cats.js"

const cats: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: FastifyPluginOptions
): Promise<void> => {
    fastify.get("/", {
        schema: {
            description: "Obtener todos los gatitos",
            summary: "Obtener todos los gatitos registrados",
            tags: ["cats"],
            response: {
                200: {
                    type: "array",
                    items: CatsSchema,
                }
            }
        },
        handler: async function (request, reply) {
            const res = await query(`SELECT
                id,
                raze,
                name,
                birthdate
                FROM cats`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "No hay gatitos registrados" });
                return;
            }
            return res.rows;
        }
    });

    //Post
    fastify.post("/", {
        schema:{
            description: "Crear un gatito",
            summary: "Crear un gatito",
            tags: ["cats"],
            body: CatPostSchema,
            response: {
                200: CatPostSchema
            }
        },
        handler: async function (request, reply) {
            const {raze, name, birthdate} = request.body as CatPostType;
            const res = await query(`INSERT INTO cats(raze, name, birthdate) VALUES($1, $2, $3) RETURNING *`, [raze, name, birthdate]);
            return res.rows[0];
        }
    });
}

export default cats;