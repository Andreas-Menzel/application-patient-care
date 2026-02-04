import {initContract} from '@ts-rest/core';
import {z} from 'zod';
import { PatientResponseSchema } from '../schemas/patient.schema.js';
import {ProblemDetailsSchema} from "../schemas/common.schema.js"


const c = initContract();

export const patientContract = c.router({
    getPatients: {
        method: 'GET',
        path: '/',
        responses: {
            200: z.array(PatientResponseSchema),
        },
        summary: 'Get all patients',
    },
    getPatient: {
        method: 'GET',
        path: '/:id',
        pathParams: z.object({
            id: z.string(),
        }),
        responses: {
            200: PatientResponseSchema,
            404: ProblemDetailsSchema,
        },
        summary: 'Get a patient by id',
    },
}, {
    pathPrefix: "/patients"
});