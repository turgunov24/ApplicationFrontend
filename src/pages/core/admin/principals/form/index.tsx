import type { IForm } from './form';

import { useMemo } from 'react';
import { HttpStatusCode } from 'axios';
import { omit } from 'es-toolkit/compat';
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
import { principalsService, PRINCIPALS_BASE_QUERY_KEY } from '../services';

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

  const { watch, setError, handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationKey: [PRINCIPALS_BASE_QUERY_KEY, 'save'],
    mutationFn: async (formData: IForm) => {
      if (id) {
        const valuesToSend = watch('updatePassword')
          ? omit(formData, ['file', 'updatePassword', 'confirmPassword'])
          : omit(formData, ['file', 'updatePassword', 'password', 'confirmPassword']);
        const response = await principalsService.form.update(Number(id), valuesToSend);

        if (response.status === HttpStatusCode.Ok) {
          const avatarResponse = await principalsService.helpers.uploadAvatar(
            response.data.id,
            formData.file as File
          );
          if (avatarResponse.status === HttpStatusCode.Ok) {
            return response;
          }
        }
      } else {
        const response = await principalsService.form.create(
          omit(formData, ['file', 'updatePassword'])
        );
        if (response.status === HttpStatusCode.Created) {
          const avatarResponse = await principalsService.helpers.uploadAvatar(
            response.data.id,
            formData.file as File
          );
          if (avatarResponse.status === HttpStatusCode.Ok) {
            return response;
          }
        }
      }
      return false;
    },
    onSuccess: () => {
      toast.success(id ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.principals.root);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (id) {
        if (watch('updatePassword')) {
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

      mutate(data);
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

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={id ? 'Update principal' : 'Create a new principal'}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Principals', href: paths.dashboard.principals.root },
          { name: id ? 'Update' : 'Create' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Form methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ pt: 10, pb: 5, px: 3 }}>
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
                <Field.Phone name="phone" label="Phone number" defaultCountry="UZ" />

                <Field.AutocompleteMatchId
                  fullWidth
                  name="countryId"
                  label="Country"
                  placeholder="Choose a country"
                  options={countriesList.map((country) => ({
                    id: country.id,
                    label: country.nameUz,
                  }))}
                  customOnChange={(event, option) => {
                    methods.setValue('regionId', defaultValues.regionId);
                    methods.setValue('districtId', defaultValues.districtId);
                  }}
                />

                <Field.AutocompleteMatchId
                  fullWidth
                  name="regionId"
                  label="Region"
                  placeholder="Choose a region"
                  options={regionsList
                    .filter((region) => region.countryId === watch('countryId'))
                    .map((region) => ({
                      id: region.id,
                      label: region.nameUz,
                    }))}
                />

                <Field.AutocompleteMatchId
                  fullWidth
                  name="districtId"
                  label="District"
                  placeholder="Choose a district"
                  options={districtsList
                    .filter((district) => district.regionId === watch('regionId'))
                    .map((district) => ({
                      id: district.id,
                      label: district.nameUz,
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
                <Button type="submit" variant="contained" loading={isPending}>
                  {id ? 'Update principal' : 'Create principal'}
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
