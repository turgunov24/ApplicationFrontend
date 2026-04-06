import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  translationKey: z.string().min(1, { error: 'Translation Key is required!' }),
  token: z.string().min(1, { error: 'Token is required!' }),
  description: z.string().optional(),
});

export const defaultValues: IForm = {
  translationKey: '',
  token: '',
  description: '',
};
