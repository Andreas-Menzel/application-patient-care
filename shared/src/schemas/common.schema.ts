import {z} from "zod"


// RFC 7807 Problem Details schema
// TODO: add more fields for more information
export const ProblemDetailsSchema = z.object({
    type: z.string(),
    title: z.string(),
    status: z.number(),
    detail: z.string().optional(),
    instance: z.string().optional(),
});