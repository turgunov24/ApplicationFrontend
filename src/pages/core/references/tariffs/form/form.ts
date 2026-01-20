import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  nameUz: z.string().min(1, { message: 'Name Uz is required!' }),
  nameRu: z.string().min(1, { message: 'Name Ru is required!' }),
  monthlyPrice: z.coerce.number().min(0, { message: 'Monthly price must be positive!' }),
  currencyId: z
    .object({
      id: z.number(),
      label: z.string(),
    })
    .nullable(),
});

export const defaultValues: IForm = {
  nameUz: '',
  nameRu: '',
  monthlyPrice: 0,
  currencyId: null,
};
