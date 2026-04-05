import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  translationKey: z.string().min(1, { message: 'Translation Key is required!' }),
  description: z.string().optional(),
  recurrence: z.enum(['once', 'monthly', 'fiscalQuarter', 'yearly'], { error: 'Recurrence is required!' }),
  date: z.coerce.date().nullable(),
  dayOfMonth: z.number().nullable(),
  monthOfQuarter: z.number().nullable(),
  monthOfYear: z.number().nullable(),
});

export const defaultValues: IForm = {
  translationKey: '',
  description: '',
  recurrence: 'once',
  date: null,
  dayOfMonth: null,
  monthOfQuarter: null,
  monthOfYear: null,
};
