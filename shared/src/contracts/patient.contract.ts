import {initContract} from '@ts-rest/core';
import {z} from 'zod';
import { PatientResponseSchema } from '../models/patient.schema.js';

const c = initContract();

export const patientContract = c.router({
    getPatients: {
        method: 'GET',
        path: '/patients',
        responses: {
            200: z.array(PatientResponseSchema),
        },
        summary: 'Get all patients',
    },
    getPatient: {
        method: 'GET',
        path: '/patients/:id',
        pathParams: z.object({
            id: z.string(),
        }),
        responses: {
            200: PatientResponseSchema,
        },
        summary: 'Get a patient by id',
    },
});