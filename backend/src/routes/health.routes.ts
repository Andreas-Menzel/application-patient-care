import { apiContract } from "shared";
import {s} from "../server.js"

export const healthRouter = s.router(apiContract.health, {
    getPing: async () => {
        return {
            status: 200,
            body: "pong"
        }
    }
})