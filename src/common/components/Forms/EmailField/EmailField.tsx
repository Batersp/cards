import React from 'react';

import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useField } from 'formik';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
};

export const EmailField: React.FC<PropsType> = ({
  label,
  name,
  className,
  disabled,
}): ReturnComponentType => {
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth variant="standard" className={className}>
      <InputLabel>{label}</InputLabel>
      <Input margin="dense" {...field} name={name} disabled={disabled} />
      {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
