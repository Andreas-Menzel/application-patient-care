import { healthRouter } from "./health.routes.js";
import { patientRouter } from "./patient.routes.js";

export const apiRouter = {
    health: healthRouter,
    patients: patientRouter
};