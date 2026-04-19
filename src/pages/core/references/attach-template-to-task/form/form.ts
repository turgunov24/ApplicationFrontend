import * as z from 'zod';

import { schemaUtils } from 'src/components/hook-form';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  principalCustomerId: z.number({ error: 'Principal customer is required!' }),
  taskTemplateIds: z
    .array(z.number(), { error: 'Task templates are required!' })
    .min(1, { message: 'Select at least one task template!' }),
  // startDate: z.string().min(1, { error: 'Start date is required!' }),
  startDate: schemaUtils.date({ error: { required: 'Start date is required!' } }),
  // endDate: z.string().min(1, { error: 'End date is required!' }),
  endDate: schemaUtils.date({ error: { required: 'End date is required!' } }),
});

export const defaultValues: IForm = {
  // @ts-expect-error number emasligi uchun error beryapti
  principalCustomerId: null,
  taskTemplateIds: [],
  startDate: null,
  endDate: null,
};
