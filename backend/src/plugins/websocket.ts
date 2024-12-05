import fastifyWebsocket from "@fastify/websocket";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
    fastify.register(fastifyWebsocket);
});