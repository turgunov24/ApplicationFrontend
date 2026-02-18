import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required!' }),
  principalId: z.number({ error: 'Principal is required!' }),
  clientTypeId: z.number({ error: 'Client type is required!' }),
});

export const defaultValues: IForm = {
  name: '',
  // @ts-expect-error number emasligi uchun error beryapti
  principalId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  clientTypeId: null,
};
