import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required!' }),
});

export const defaultValues: IForm = {
  name: '',
};
