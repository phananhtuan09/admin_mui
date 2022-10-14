import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/Components/Global/Iconify';
import {
  FormProviderRegister,
  RHFTextField,
} from '@/Components/Global/hook-form';
import { registerDispatch, clearState } from '@/redux/slice/auth';
import Toastify, { optionsToast } from '@/Components/Global/Toastify';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { UserTypes } from '@/interfaces/auth.interface';
import { useUpdateEffect } from '@/customHooks';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues: UserTypes = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UserTypes) => {
    dispatch(registerDispatch(data));
    //navigate('/dashboard', { replace: true });
  };
  useUpdateEffect(() => {
    if (error) {
      toast.error(<>{error}</>, { ...optionsToast, type: toast.TYPE.ERROR });
    }
    if (isAuthenticated) {
      toast.success('Register Successful!', {
        ...optionsToast,
        type: toast.TYPE.SUCCESS,
      });

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
    dispatch(clearState());
    // return () => {
    //   dispatch(clearState());
    // };
  }, [isAuthenticated, error]);

  return (
    <>
      <FormProviderRegister methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="First name" />
            <RHFTextField name="lastName" label="Last name" />
          </Stack>

          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProviderRegister>
      <Toastify />
    </>
  );
}
