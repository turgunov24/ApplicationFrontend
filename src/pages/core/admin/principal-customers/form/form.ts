import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required!' }),
  principalId: z.number({ error: 'Principal is required!' }),
  clientTypeId: z.number({ error: 'Client type is required!' }),
  counterpartyId: z.number({ error: 'Counterparty is required!' }),
  legalFormId: z.number({ error: 'Legal form is required!' }),
  inn: z.coerce.number().min(1, { message: 'INN is required!' }),
});

export const defaultValues: IForm = {
  name: '',
  // @ts-expect-error number emasligi uchun error beryapti
  principalId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  clientTypeId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  counterpartyId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  legalFormId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  inn: null,
};
