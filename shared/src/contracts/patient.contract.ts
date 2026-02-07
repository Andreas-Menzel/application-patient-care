import {initContract} from '@ts-rest/core';
import {z} from 'zod';
import {PatientCreateSchema, PatientResponseSchema, PatientUpdateSchema} from '../schemas/patient.schema.js';
import {ProblemDetailsSchema} from "../schemas/common.schema.js"


const c = initContract();

export const patientContract = c.router({
    getPatients: {
        method: 'GET',
        path: '/',
        responses: {
            200: z.array(PatientResponseSchema),
            500: ProblemDetailsSchema
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
    createPatient: {
        method: 'POST',
        path: '/',
        body: PatientCreateSchema,
        responses: {
            201: PatientResponseSchema,
            400: ProblemDetailsSchema,
            409: ProblemDetailsSchema // Conflict
        },
        summary: 'Create a new patient'
    },
    updatePatient: {
        method: 'PATCH',
        path: '/:id',
        body: PatientUpdateSchema,
        responses: {
            200: PatientResponseSchema,
            400: ProblemDetailsSchema,
            404: ProblemDetailsSchema
        }
    },
    deletePatient: {
        method: 'DELETE',
        path: '/:id',
        responses: {
            204: null,
            404: ProblemDetailsSchema
        }
    }
}, {
    pathPrefix: "/patients"
});