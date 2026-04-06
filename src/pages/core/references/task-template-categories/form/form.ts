import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  translationKey: z.string().min(1, { error: 'Translation Key is required!' }),
});

export const defaultValues: IForm = {
  translationKey: '',
};
