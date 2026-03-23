import * as z from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { schemaUtils } from 'src/components/hook-form';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  name: z.string().min(1, { error: 'Name is required!' }),
  phone: schemaUtils.phoneNumber({ isValid: isValidPhoneNumber }),
});

export const defaultValues: IForm = {
  name: '',
  phone: '',
};
