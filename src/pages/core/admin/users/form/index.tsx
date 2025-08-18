import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { usersService } from '../services';
import { IFormSchema, defaultValues } from './form';

export default function FormPage() {
  const router = useRouter();

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(IFormSchema),
    defaultValues,
    // values: currentUser,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  console.log('🚀 ~ FormPage ~ values:', values);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const file = data.file;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fullName', data.fullName);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('phone', data.phoneNumber);
        if (data.countryId) {
          if (data.countryId.id) {
            formData.append('countryId', data.countryId.id.toString());
          }
        }
        if (data.stateId) {
          if (data.stateId.id) {
            formData.append('regionId', data.stateId.id.toString());
          }
        }
        if (data.cityId) {
          if (data.cityId.id) {
            formData.append('cityId', data.cityId.id.toString());
          }
        }
        if (data.roleId) {
          if (data.roleId.id) {
            formData.append('roleId', data.roleId.id.toString());
          }
        }
        formData.append('status', data.status);
        formData.append('isVerified', data.isVerified.toString());
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        const response = await usersService.form.create(formData);
      }
      reset();
      toast.success('Create success!');
      router.push(paths.dashboard.users.root);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
              {/* {currentUser && ( */}
              {/* <Label
                  color={
                    (values.status === 'active' && 'success') ||
                    (values.status === 'banned' && 'error') ||
                    'warning'
                  }
                  sx={{ position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label> */}
              {/* )} */}

              <Box sx={{ mb: 5 }}>
                <Field.UploadAvatar
                  name="file"
                  maxSize={3145728}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 3,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.disabled',
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
              </Box>

              {/* {currentUser && ( */}
              {/* <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value !== 'active'}
                          onChange={(event) =>
                            field.onChange(event.target.checked ? 'banned' : 'active')
                          }
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Banned
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply disable account
                      </Typography>
                    </>
                  }
                  sx={{
                    mx: 0,
                    mb: 3,
                    width: 1,
                    justifyContent: 'space-between',
                  }}
                /> */}
              {/* )} */}

              <Field.Switch
                name="isVerified"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Email verified
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will automatically send the user a verification email
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />

              {/* {currentUser && ( */}
              {/* <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                  <Button variant="soft" color="error">
                    Delete user
                  </Button>
                </Stack> */}
              {/* )} */}
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  rowGap: 3,
                  columnGap: 2,
                  display: 'grid',
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <Field.Text name="fullName" label="Full name" />
                <Field.Text name="username" label="Username" />
                <Field.Text name="email" label="Email address" />
                <Field.Phone name="phoneNumber" label="Phone number" defaultCountry="US" />

                {/* <Field.CountrySelect
                  fullWidth
                  name="countryId"
                  label="Country"
                  placeholder="Choose a country"
                /> */}

                <Field.Autocomplete
                  fullWidth
                  name="countryId"
                  label="Country"
                  placeholder="Choose a country"
                  options={[
                    {
                      label: 'Uzbekistan',
                      id: 1,
                    },
                  ]}
                />

                <Field.Autocomplete
                  fullWidth
                  name="stateId"
                  label="State/region"
                  placeholder="Choose a state/region"
                  options={[
                    {
                      label: 'Andijan',
                      id: 1,
                    },
                  ]}
                />

                <Field.Autocomplete
                  fullWidth
                  name="cityId"
                  label="City"
                  placeholder="Choose a city"
                  options={[
                    {
                      label: 'Andijan',
                      id: 1,
                    },
                  ]}
                />

                <Field.Autocomplete
                  fullWidth
                  name="roleId"
                  label="Role"
                  placeholder="Choose a role"
                  options={[
                    {
                      label: 'Admin',
                      id: 1,
                    },
                  ]}
                />

                <Field.Text name="password" label="Password" />
                <Field.Text name="confirmPassword" label="Confirm password" type="password" />
              </Box>

              <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
                <Button type="submit" variant="contained" loading={isSubmitting}>
                  Create user
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </DashboardContent>
  );
}
