import type { TextFieldProps } from '@mui/material/TextField';
import type { AutocompleteProps } from '@mui/material/Autocomplete';

import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

type Multiple = boolean | undefined;
type DisableClearable = boolean | undefined;
// type FreeSolo = boolean | undefined;

type OptionType = {
  label: string;
  id: number | string;
};

type ExcludedProps = 'renderInput';

export type AutocompleteBaseProps = Omit<
  AutocompleteProps<OptionType, Multiple, DisableClearable, false>,
  ExcludedProps
>;

export type RHFAutocompleteProps = AutocompleteBaseProps & {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: Array<OptionType>;
  slotProps?: AutocompleteBaseProps['slotProps'] & {
    textField?: Partial<TextFieldProps>;
  };
  customOnChange?: AutocompleteBaseProps['onChange'];
};

export function RHFAutocompleteMatchId({
  name,
  label,
  slotProps,
  helperText,
  placeholder,
  options = [],
  customOnChange,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();

  const { textField, ...otherSlotProps } = slotProps ?? {};

  // Ensure options is always an array
  const safeOptions = useMemo(() => (Array.isArray(options) ? options : []), [options]);

  // Helper function to get the current value for display
  const getDisplayValue = (fieldValue: any) => {
    if (!fieldValue) {
      return other.multiple ? [] : null;
    }

    if (Array.isArray(fieldValue)) {
      // For multiple selection, find the full objects for the IDs
      return fieldValue.map((id) => safeOptions.find((option) => option.id === id)).filter(Boolean);
    }

    if (typeof fieldValue === 'number' || typeof fieldValue === 'string') {
      // For single selection with ID, find the full object
      return safeOptions.find((option) => option.id === fieldValue) || null;
    }

    return fieldValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          value={getDisplayValue(field.value)}
          id={`${name}-custom-autocomplete`}
          onChange={(event, newValue, reason) => {
            if (newValue) {
              if (Array.isArray(newValue)) {
                setValue(
                  name,
                  newValue.map((item) => item.id),
                  { shouldValidate: true }
                );
              } else {
                setValue(name, newValue.id, { shouldValidate: true });
              }
            } else {
              // For multiple selection, set empty array instead of null
              setValue(name, other.multiple ? [] : null, { shouldValidate: true });
            }

            if (customOnChange) {
              customOnChange(event, newValue, reason);
            }
          }}
          getOptionKey={(option) => option.id}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => {
            if (Array.isArray(option)) {
              return option.map((item) => item.label).join(', ');
            }
            if (typeof option === 'number' || typeof option === 'string') {
              const foundOption = safeOptions.find((item) => item.id === option);
              return foundOption ? foundOption.label : String(option);
            }

            return option.label;
          }}
          options={safeOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              {...textField}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message ?? helperText}
              slotProps={{
                ...textField?.slotProps,
                htmlInput: {
                  ...params.inputProps,
                  ...textField?.slotProps?.htmlInput,
                  autoComplete: 'new-password', // Disable autocomplete and autofill
                },
              }}
            />
          )}
          slotProps={{
            ...otherSlotProps,
            chip: {
              size: 'small',
              variant: 'soft',
              ...otherSlotProps?.chip,
            },
          }}
          {...other}
        />
      )}
    />
  );
}
