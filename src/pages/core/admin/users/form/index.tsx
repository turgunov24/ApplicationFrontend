import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import useList from 'src/hooks/useList/v1/Index';

import { fData } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import SetValues from './setValues';
import { IFormSchema, defaultValues } from './form';
import { usersService, USERS_BASE_QUERY_KEY } from '../services';

export default function FormPage() {
  const router = useRouter();
  const { id } = useParams();

  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(IFormSchema),
    defaultValues,
  });

  const {
    watch,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync } = useMutation({
    mutationKey: [USERS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (formData: FormData) => {
      if (id) {
        const response = await usersService.form.update(Number(id), formData);
        return response;
      }
      const response = await usersService.form.create(formData);
      return response;
    },
    onSuccess: () => {
      toast.success(id ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.users.root);
    },
  });

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
        formData.append('countryId', data.countryId.toString());
        formData.append('regionId', data.stateId.toString());
        formData.append('cityId', data.cityId.toString());

        if (data.roles.length > 0) {
          data.roles.forEach((role, index) => {
            formData.append(`roles[${index}]`, role.toString());
          });
        }

        formData.append('status', data.status);
        formData.append('isVerified', data.isVerified.toString());
        if (id) {
          if (data.password && !data.confirmPassword) {
            setError('confirmPassword', {
              message: 'Confirm password is required!',
              type: 'required',
            });
            return;
          }
          if (data.confirmPassword && !data.password) {
            setError('password', {
              message: 'Password is required!',
              type: 'required',
            });
            return;
          }

          if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
            setError('confirmPassword', {
              message: 'Passwords do not match!',
              type: 'required',
            });
            return;
          }
        } else {
          if (!data.password) {
            setError('password', {
              message: 'Password is required!',
              type: 'required',
            });
            return;
          }
          if (!data.confirmPassword) {
            setError('confirmPassword', {
              message: 'Confirm password is required!',
              type: 'required',
            });
            return;
          }
          if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
            setError('confirmPassword', {
              message: 'Passwords do not match!',
              type: 'required',
            });
            return;
          }
        }

        if (data.password) {
          formData.append('password', data.password);
        }

        await mutateAsync(formData);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const updatePassword = watch('updatePassword');

  const showPasswordFields = useMemo(() => {
    if (id) {
      return updatePassword;
    }
    return true;
  }, [id, updatePassword]);

  const { data: countriesList = [] } = useList({ listType: 'countries' });
  const { data: regionsList = [] } = useList({ listType: 'regions' });
  const { data: districtsList = [] } = useList({ listType: 'districts' });
  const { data: rolesList = [] } = useList({ listType: 'roles' });

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={id ? 'Update user' : 'Create a new user'}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: id ? 'Update' : 'Create' },
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

              {id ? (
                <Field.Switch
                  slotProps={{
                    wrapper: {
                      sx: {
                        mt: 2,
                      },
                    },
                  }}
                  name="updatePassword"
                  labelPlacement="start"
                  label={
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Update Password
                    </Typography>
                  }
                  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              ) : null}

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
                <Field.Phone
                  name="phoneNumber"
                  label="Phone number"
                  defaultCountry="UZ"
                  // country="UZ"
                />

                {/* <Field.CountrySelect
                  fullWidth
                  name="countryId"
                  label="Country"
                  placeholder="Choose a country"
                /> */}

                <Field.AutocompleteMatchId
                  fullWidth
                  name="countryId"
                  label="Country"
                  placeholder="Choose a country"
                  options={countriesList.map((country) => ({
                    id: country.id,
                    label: country.nameUz,
                  }))}
                />

                <Field.AutocompleteMatchId
                  fullWidth
                  name="stateId"
                  label="State/region"
                  placeholder="Choose a state/region"
                  options={regionsList.map((region) => ({
                    id: region.id,
                    label: region.nameUz,
                  }))}
                />

                <Field.AutocompleteMatchId
                  fullWidth
                  name="cityId"
                  label="City"
                  placeholder="Choose a city"
                  options={districtsList.map((district) => ({
                    id: district.id,
                    label: district.nameUz,
                  }))}
                />

                <Field.AutocompleteMatchId
                  fullWidth
                  multiple
                  name="roles"
                  label="Roles"
                  disableCloseOnSelect
                  placeholder="Choose roles"
                  options={rolesList.map((role) => ({
                    id: role.id,
                    label: role.nameUz,
                  }))}
                />

                {showPasswordFields ? (
                  <>
                    <Field.Text
                      name="password"
                      label="Password"
                      type={showPassword.value ? 'text' : 'password'}
                      placeholder="6+ characters"
                      slotProps={{
                        inputLabel: { shrink: true },
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={showPassword.onToggle} edge="end">
                                <Iconify
                                  icon={
                                    showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <Field.Text
                      name="confirmPassword"
                      label="Confirm password"
                      type={showConfirmPassword.value ? 'text' : 'password'}
                      placeholder="6+ characters"
                      slotProps={{
                        inputLabel: { shrink: true },
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={showConfirmPassword.onToggle} edge="end">
                                <Iconify
                                  icon={
                                    showConfirmPassword.value
                                      ? 'solar:eye-bold'
                                      : 'solar:eye-closed-bold'
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </>
                ) : null}
              </Box>

              <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
                <Button type="submit" variant="contained" loading={isSubmitting}>
                  {id ? 'Update user' : 'Create user'}
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <SetValues />
      </Form>
    </DashboardContent>
  );
}
