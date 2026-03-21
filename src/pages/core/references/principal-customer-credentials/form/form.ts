import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  serviceId: z.number({ error: 'Service is required!' }),
  username: z.string().min(1, { error: 'Username is required!' }),
  password: z.string().min(1, { error: 'Password is required!' }),
  additionalInformationUz: z.string().optional(),
  additionalInformationRu: z.string().optional(),
  principalCustomerId: z.number({ error: 'Principal customer is required!' }),
});

export const defaultValues: IForm = {
  // @ts-expect-error number emasligi uchun error beryapti
  serviceId: null,
  username: '',
  password: '',
  additionalInformationUz: '',
  additionalInformationRu: '',
  // @ts-expect-error number emasligi uchun error beryapti
  principalCustomerId: null,
};
