import * as z from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

import { schemaUtils } from 'src/components/hook-form';

export type IForm = z.infer<typeof IFormSchema>;

export const IFormSchema = z.object({
  file: schemaUtils.file({ error: 'Avatar is required!' }),
  fullName: z.string().min(1, { error: 'Full name is required!' }),
  username: z.string().min(1, { error: 'Username is required!' }),
  email: schemaUtils.email(),
  phoneNumber: schemaUtils.phoneNumber({ isValid: isValidPhoneNumber }),
  // countryId: schemaUtils.nullableInput(z.string().min(1, { error: 'Country is required!' }), {
  //   error: 'Country is required!',
  // }),
  countryId: z.number({ error: 'Country is required!' }),
  stateId: z.number({ error: 'State is required!' }),
  cityId: z.number({ error: 'City is required!' }),
  // Not required
  status: z.string(),
  isVerified: z.boolean(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  updatePassword: z.boolean().optional(),
  roles: z.array(z.number()),
});
// .refine((data) => data.password === data.confirmPassword, {
//   error: 'Passwords do not match!',
//   path: ['confirmPassword'], // This will show the error on the confirmPassword field
// });

export const defaultValues: IForm = {
  status: '',
  file: null,
  isVerified: true,
  fullName: '',
  username: '',
  email: '',
  phoneNumber: '',
  // @ts-expect-error number emasligi uchun error beryapti
  countryId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  stateId: null,
  // @ts-expect-error number emasligi uchun error beryapti
  cityId: null,
  password: '',
  confirmPassword: '',
  updatePassword: false,
  roles: [],
};
