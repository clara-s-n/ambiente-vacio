import {Static, Type} from "@sinclair/typebox";
import { CatsSchema } from "../types/cats.js";
import { WebSocket } from "ws";

/** Map from user ids, to map of socket ids to their websockets. */
const sockets = new Map<number, Map<string, WebSocket>>();

export const webSocketSchema = Type.Object({
    type: Type.Literal("new-cat"),
    data: CatsSchema,
});

export type WebSocketMessage = Static<typeof webSocketSchema>;

/**
 * The function calls clearWebSocket on closing the websocket, so consumers
 * needn't worry about it.
 */
export function registerWebSocket(userId: number, socket: WebSocket) {
    // Store socket
    const socketUUID = crypto.randomUUID();

    if (!sockets.has(userId)) {
        sockets.set(userId, new Map());
    }

    // NOTE: We could potentially limit how many concurrent connections an
    // account may have pretty easily here.
    sockets.get(userId)?.set(socketUUID, socket);

    // Ensure socket is cleaned up on close
    socket.on("close", () => {
        clearWebSocket(userId, socketUUID);
    });

    return socketUUID;
}

export function clearWebSocket(userId: number, socketId: string) {
    const socketsForUser = sockets.get(userId);

    if (socketsForUser === undefined) {
        return;
    }

    socketsForUser.delete(socketId);

    // Remove empty sets to avoid memory leaks.
    if (socketsForUser.size === 0) {
        sockets.delete(userId);
    }
}

export function sendToWebSocket(userId: number, message: WebSocketMessage) {
    // Se envía a todos los usuarios
    if (userId === 0) {
        for (const [, socketsForUser] of sockets) {
            for (const [, socket] of socketsForUser) {
                socket.send(JSON.stringify(message));
            }
        }
        return;
    }
}
