import { initContract } from "@ts-rest/core";
import { PingReponseSchema } from "../schemas/health.schema.js";


const c = initContract();

export const healthContract = c.router({
    getPing: {
        method: "GET",
        path: "/ping",
        responses: {
            200: PingReponseSchema
        },
        summary: "Returns 'pong'"
    }
}, {
    pathPrefix: "/health"
});
