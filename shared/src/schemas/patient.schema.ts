import {z} from "zod"

const PatientSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.enum(["male", "female"]),
});

export const PatientResponseSchema = PatientSchema.strict();
export const PatientCreateSchema = PatientSchema.omit({id: true}).strict();
export const PatientUpdateSchema = PatientSchema.omit({id: true}).partial().strict();

export type PatientResponse = z.infer<typeof PatientResponseSchema>;
export type PatientCreate = z.infer<typeof PatientCreateSchema>;
export type PatientUpdate = z.infer<typeof PatientUpdateSchema>;
