import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  nameUz: z.string().min(1, { error: 'Name Uz is required!' }),
  nameRu: z.string().min(1, { error: 'Name Ru is required!' }),
  permissionGroupId: z.number({ error: 'Permission Group is required!' }),
  resource: z.string({ error: 'Resource is required!' }),
  action: z.string({ error: 'Action is required!' }),
});

export const defaultValues: IForm = {
  nameUz: '',
  nameRu: '',
  // @ts-expect-error number emasligi uchun error beryapti
  permissionGroupId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  resource: null,
  // @ts-expect-error string emasligi uchun error beryapti
  action: null,
};
