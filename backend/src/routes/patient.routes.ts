import { apiContract, PatientResponse } from "shared";
import { s } from "../server.js";


// Sample data for now
const patients: PatientResponse[] = [
    {
        id: 0,
        firstName: "Andreas",
        lastName: "Menzel",
        gender: "male"
    },
    {
        id: 0,
        firstName: "John",
        lastName: "Doe",
        gender: "male"
    }
];

export const patientRouter = s.router(apiContract.patients, {
  getPatients: async () => {
    return {
      status: 200,
      body: patients,
    };
  },
  getPatient: async ({ params: { id } }) => {
    const pId = Number(id);
    if (patients[pId] === undefined) {
      return {
        status: 404,
        body: {
          type: 'https://httpstatuses.com/404',
          title: 'Patient Not Found',
          status: 404,
          detail: `No patient found with id: ${id}`,
          instance: `/patients/${id}`,
        },
      };
    }
    return {
      status: 200,
      body: patients[pId],
    };
  }
});
