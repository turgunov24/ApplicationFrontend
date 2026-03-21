import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  principalCustomerId: z.number({ error: 'Principal customer is required!' }),
  tariffId: z.number({ error: 'Tariff is required!' }),
  startDate: z.string().min(1, { error: 'Start date is required!' }),
  endDate: z.string().optional(),
});

export const defaultValues: IForm = {
  // @ts-expect-error number emasligi uchun error beryapti
  principalCustomerId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  tariffId: null,
  startDate: '',
  endDate: '',
};
