import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  translationKey: z.string().min(1, { message: 'Translation Key is required!' }),
  description: z.string().optional(),
  deadline: z.coerce.date().nullable(),
  principalCustomerId: z.number({ error: 'Principal customer is required!' }),
});

export const defaultValues: IForm = {
  translationKey: '',
  description: '',
  deadline: null,
  // @ts-expect-error number emasligi uchun error beryapti
  principalCustomerId: null,
};
