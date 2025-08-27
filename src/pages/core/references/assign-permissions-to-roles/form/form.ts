import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  nameUz: z.string().min(1, { error: 'Name Uz is required!' }),
  nameRu: z.string().min(1, { error: 'Name Ru is required!' }),
  descriptionUz: z.string().min(1, { error: 'Description Uz is required!' }),
  descriptionRu: z.string().min(1, { error: 'Description Ru is required!' }),
});

export const defaultValues: IForm = {
  nameUz: '',
  nameRu: '',
  descriptionUz: '',
  descriptionRu: '',
};
