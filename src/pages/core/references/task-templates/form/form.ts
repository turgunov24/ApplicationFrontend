import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  translationKey: z.string().min(1, { message: 'Translation Key is required!' }),
  description: z.string().optional(),
  recurrenceId: z.number({ message: 'Recurrence is required!' }),
  taskTemplateCategoryId: z.number({ message: 'Task Template Category is required!' }),
  date: z.coerce.date().nullable(),
  dayOfMonth: z.number().nullable(),
  monthOfQuarter: z.number().nullable(),
  monthOfYear: z.number().nullable(),
});

export const defaultValues: IForm = {
  translationKey: '',
  description: '',
    // @ts-expect-error number emasligi uchun error beryapti
  recurrenceId: null,
    // @ts-expect-error number emasligi uchun error beryapti
  taskTemplateCategoryId: null,
  date: null,
  dayOfMonth: null,
  monthOfQuarter: null,
  monthOfYear: null,
};
