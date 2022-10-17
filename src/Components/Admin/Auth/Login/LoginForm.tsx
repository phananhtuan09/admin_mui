import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '@/Components/Global/Iconify';
import {
  FormProviderLogin,
  RHFTextField,
  RHFCheckbox,
} from '@/Components/Global/hook-form';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { loginDispatch, clearState } from '@/redux/slice/auth';
import Toastify, { optionsToast } from '@/Components/Global/Toastify';
import { toast } from 'react-toastify';
import { IUserInfo } from '@/interfaces/redux.interface';
import { useUpdateEffect } from '@/customHooks';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { error, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues: IUserInfo = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: IUserInfo) => {
    dispatch(loginDispatch(data));
  };
  // useEffect(() => {
  //   dispatch(clearState());
  // }, []);
  // useEffect(() => {

  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, [error, isAuthenticated]);
  useUpdateEffect(() => {
    if (error) {
      toast.error(<>{error}</>, { ...optionsToast, type: toast.TYPE.ERROR });
      dispatch(clearState());
    }
    if (isAuthenticated) {
      toast.success('Login Successful!', {
        ...optionsToast,
        type: toast.TYPE.SUCCESS,
      });
      // dispatch(clearState());
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    }
  }, [error, isAuthenticated]);

  return (
    <>
      <FormProviderLogin methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <RHFCheckbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProviderLogin>
      <Toastify />
    </>
  );
}
