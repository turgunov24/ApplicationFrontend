import * as z from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { schemaUtils } from 'src/components/hook-form';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  file: schemaUtils.file().optional(),
  fullName: z.string().min(1, { error: 'Full name is required!' }),
  username: z.string().min(1, { error: 'Username is required!' }),
  email: schemaUtils.email(),
  phone: schemaUtils.phoneNumber({ isValid: isValidPhoneNumber }),
  countryId: z.number({ error: 'Country is required!' }),
  regionId: z.number({ error: 'Region is required!' }),
  districtId: z.number({ error: 'District is required!' }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  updatePassword: z.boolean().optional(),
});

export const defaultValues: IForm = {
  file: null,
  fullName: '',
  username: '',
  email: '',
  phone: '',
  // @ts-expect-error number emasligi uchun error beryapti
  countryId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  regionId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  districtId: null,
  password: '',
  confirmPassword: '',
  updatePassword: false,
};
