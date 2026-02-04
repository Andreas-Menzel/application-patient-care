import { apiContract, PatientDbToResponseSchema } from "shared";
import { s } from "../server.js";
import { createPatient, deletePatientById, getAllPatients, getPatientById, updatePatientById } from "../services/patients.service.js";
import { errorToHttpResponse } from "../utils/error-response.js";


export const patientRouter = s.router(apiContract.patients, {
  getPatients: async ({ req }) => {
    try {
      const patients = await getAllPatients();
      return {
        status: 200,
        body: patients.map((pat) => PatientDbToResponseSchema.parse(pat))
      }
    } catch(error) {
      return errorToHttpResponse(error, req);
    }
  },
  getPatient: async ({ params: { id }, req }) => {
    try {
      const patient = await getPatientById(Number(id));
      return {
        status: 200,
        body: PatientDbToResponseSchema.parse(patient)
      }
    } catch(error) {
      return errorToHttpResponse(error, req);
    }
  },
  createPatient: async ({ body, req }) => {
    try {
      const patient = await createPatient(body);
      return {
        status: 201,
        body: PatientDbToResponseSchema.parse(patient)
      };
    } catch(error) {
      return errorToHttpResponse(error, req);
    }
  },
  updatePatient: async ({ params: { id }, body, req }) => {
    try {
      const patient = updatePatientById(Number(id), body);
      return {
        status: 200,
        body: PatientDbToResponseSchema.parse(patient)
      };
    } catch(error) {
      return errorToHttpResponse(error, req);
    }
  },
  deletePatient: async ({ params: { id }, req }) => {
    try {
      await deletePatientById(Number(id));
      return {
        status: 204,
        body: null
      };
    } catch(error) {
      return errorToHttpResponse(error, req);
    }
  }
});
