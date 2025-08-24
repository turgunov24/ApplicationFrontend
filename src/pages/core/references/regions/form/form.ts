import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  nameUz: z.string().min(1, { error: 'Name Uz is required!' }),
  nameRu: z.string().min(1, { error: 'Name Ru is required!' }),
  countryId: z.object(
    {
      id: z.number(),
      label: z.string(),
    },
    { error: 'Country is required!' }
  ),
});

export const defaultValues: IForm = {
  nameUz: '',
  nameRu: '',
  // @ts-expect-error number emasligi uchun error beryapti
  countryId: null,
};
