import { FastifyPluginAsync } from "fastify"

const cats: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get('/', async function (request, reply) {
        return 'Here we shold see all cats'
    })
}

export default cats;