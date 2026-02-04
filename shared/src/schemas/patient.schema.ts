import {z} from "zod"

export const PatientSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.enum(["male", "female"]),
    createdAt: z.number()
});

export const PatientResponseSchema = PatientSchema.strict();
export const PatientDbToResponseSchema = PatientResponseSchema.strip();
export const PatientCreateSchema = PatientSchema.omit({id: true, createdAt: true}).strict();
export const PatientUpdateSchema = PatientSchema.omit({id: true, createdAt: true}).partial().strict();

export type PatientResponse = z.infer<typeof PatientResponseSchema>;
export type PatientCreate = z.infer<typeof PatientCreateSchema>;
export type PatientUpdate = z.infer<typeof PatientUpdateSchema>;
