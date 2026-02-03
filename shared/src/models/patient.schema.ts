import {z} from "zod"

const PatientSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.enum(["male", "female"]),
});

export const PatientResponseSchema = PatientSchema;
export const PatientCreateSchema = PatientSchema.omit({id: true});
export const PatientUpdateSchema = PatientSchema.omit({id: true}).partial();

export type PatientResponse = z.infer<typeof PatientResponseSchema>;
export type PatientCreate = z.infer<typeof PatientCreateSchema>;
export type PatientUpdate = z.infer<typeof PatientUpdateSchema>;
