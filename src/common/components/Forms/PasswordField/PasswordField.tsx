import React, { useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import IconButton from '@mui/material/IconButton/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import { useField } from 'formik';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
};

export const PasswordField: React.FC<PropsType> = ({
  label,
  name,
  className,
  disabled,
}): ReturnComponentType => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const onClickIconButtonHandle = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl variant="standard" fullWidth className={className}>
      <InputLabel>{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        margin="dense"
        {...field}
        name={name}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClickIconButtonHandle}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {meta.touched && meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
    </FormControl>
  );
};
