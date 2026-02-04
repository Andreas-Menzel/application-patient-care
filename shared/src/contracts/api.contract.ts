import { initContract } from "@ts-rest/core";
import { patientContract } from "./patient.contract.js";
import { healthContract } from "./health.contract.js";


const c = initContract();

export const apiContract = c.router({
    patients: patientContract,
    health: healthContract
}, {
    pathPrefix: "/api"
});