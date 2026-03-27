import * as z from 'zod';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  lang: z.string().min(1, { error: 'Lang is required!' }),
  namespace: z.string().min(1, { error: 'Namespace is required!' }),
  key: z.string().min(1, { error: 'Key is required!' }),
  value: z.string().min(1, { error: 'Value is required!' }),
});

export const defaultValues: IForm = {
  lang: '',
  namespace: '',
  key: '',
  value: '',
};
