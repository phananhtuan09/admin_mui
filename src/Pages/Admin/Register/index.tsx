import Input from '@/Components/Global/Input';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Register.scss';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import InputForm from '@/interfaces/inputForm.interface';
import { UserTypes } from '@/interfaces/auth.interface';
import { registerDispatch, clearState } from '@/redux/slice/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const optionsToast = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(1, 'Must be 1 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: (registerInfo: UserTypes) => {
      //alert(JSON.stringify(values, null, 2))
      dispatch(registerDispatch(registerInfo));
    },
  });
  const inputValues: InputForm[] = [
    {
      id: 'username',
      name: 'username',
      type: 'text',
      title: 'Username',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values.username || '',
      error: formik.errors.username || '',
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      title: 'Email',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values.email || '',
      error: formik.errors.email || '',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      title: 'Password',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values.password || '',
      error: formik.errors.password || '',
    },
    {
      id: 'passwordConfirm',
      name: 'passwordConfirm',
      type: 'password',
      title: 'Confirm Password',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values.passwordConfirm || '',
      error: formik.errors.passwordConfirm || '',
    },
  ];
  useEffect(() => {
    if (error) {
      toast.error(<>{error}</>, { ...optionsToast, type: toast.TYPE.ERROR });
    }
    if (isAuthenticated) {
      toast.success('Register Successful!', {
        ...optionsToast,
        type: toast.TYPE.SUCCESS,
      });
      dispatch(clearState());
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, isAuthenticated, error]);
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {inputValues.map((value) => (
          <div className="form-group" key={value.id}>
            <label className="form-label" htmlFor={value.id}>
              {value.title}
            </label>
            <Input {...value} />
          </div>
        ))}

        <button type="submit" className="submit_btn " disabled={loading}>
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ToastContainer />
    </>
  );
}

export default Register;
