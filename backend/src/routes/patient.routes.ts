import { PatientResponse } from "shared";
import { patientContract } from "shared";
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

export const patientRouter = s.router(patientContract, {
  getPatients: async () => {
    return {
      status: 200,
      body: patients,
    };
  },
  getPatient: async ({ params: { id } }) => {
    const pId = Number(id);
    return {
      status: 200,
      body: patients[pId],
    };
  }
});
