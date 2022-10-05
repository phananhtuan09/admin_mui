import Input from '../../Components/Global/Input'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Login.scss'

import { useAppSelector, useAppDispatch } from '@/redux/store'
import inputForm from '@/interfaces/inputForm.interface'
import { userTypes } from '@/interfaces/auth.interface'
import { loginDispatch, clearState } from '@/redux/slice/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { error, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  )
  const optionsToast = {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(1, 'Must be 1 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      // email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (loginInfo: userTypes) => {
      //alert(JSON.stringify(values, null, 2))
      dispatch(loginDispatch(loginInfo))
    },
  })
  const inputValues: inputForm[] = [
    {
      id: 'username',
      name: 'username',
      type: 'text',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values.username || '',
      error: formik.errors.username || '',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values.password || '',
      error: formik.errors.password || '',
    },
  ]
  useEffect(() => {
    if (error) {
      toast.error(<>{error}</>, { ...optionsToast, type: toast.TYPE.ERROR })
      dispatch(clearState())
    }
    if (isAuthenticated) {
      toast.success('Login Successful!', {
        ...optionsToast,
        type: toast.TYPE.SUCCESS,
      })
      dispatch(clearState())
      setTimeout(() => {
        navigate('/profile')
      }, 1000)
    }
    return () => {
      dispatch(clearState())
    }
  }, [dispatch, isAuthenticated, error])
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        {inputValues.map((value) => (
          <div className="form-group" key={value.id}>
            <label className="form-label" htmlFor={value.id}>
              {value.id[0].toLocaleUpperCase() + value.id.slice(1)}
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
  )
}

export default Login
