import { z } from 'zod';
async function validateForm(data: any, schema: z.ZodObject<any, any>) {
    try {
        const result = schema.safeParse(data);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}
export { validateForm };
