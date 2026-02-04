import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { patients } from "../db/schema.js";
import { PatientCreate, PatientSchema, PatientUpdate } from "shared";
import { InternalServerError, NotFoundError } from "../errors/index.js";


/**
 * Retrieves all patients.
 * 
 * @returns All patient data
 */
export async function getAllPatients() {
    const dbPatients = await db.select().from(patients);
    return dbPatients.map((dbPat) => PatientSchema.parse(dbPat));
}

/**
 * Retrieves a patient by their id
 * 
 * @param id The patient's id
 * @returns The patient data
 * @throws {NotFoundError} If no patient exists with the given id
 */
export async function getPatientById(id: number) {
    const dbPatients = await db.select().from(patients).where(eq(patients.id, id));

    if (dbPatients.length === 0) {
        throw new NotFoundError("patient", id);
    }
    if (dbPatients.length > 1) {
        throw new InternalServerError("Database returned multiple patient entries");
    }

    return PatientSchema.parse(dbPatients[0]);
}

/**
 * Creates a new patient
 * 
 * @param patientIn The data of the patient to create
 * @returns The patient data
 */
export async function createPatient(patientIn: PatientCreate) {
    const dbResult = await db.insert(patients).values(patientIn).returning();

    if (dbResult.length !== 1) {
        throw new InternalServerError("Could not create patient");
    }

    return PatientSchema.parse(dbResult[0]);
}

/**
 * Updates a patient
 * 
 * @param id The id of the patient to update
 * @param patientUpdate The new (partial) data for the patient
 * @returns The patient data
 * @throws {NotFoundError} If no patient exists with the given id
 */
export async function updatePatientById(id: number, patientUpdate: PatientUpdate) {
    const dbResult = await db.update(patients)
        .set(patientUpdate) // TODO: will this only update the given fields?
        .where(eq(patients.id, id))
        .returning();

    if (dbResult.length !== 1) {
        throw new NotFoundError("patient", id);
    }

    return PatientSchema.parse(dbResult[0]);
}

/**
 * Deletes a patient
 * 
 * @param id The id of the patient to delete
 * 
 * @todo Maybe only anonymize user so that references to that user do not break other entries
 */
export async function deletePatientById(id: number) {
    const dbResult = await db.delete(patients).where(eq(patients.id, id)).returning();

    if (dbResult.length === 0) {
        throw new NotFoundError("patient", id);
    }
}
