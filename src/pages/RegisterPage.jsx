import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signup } from 'redux/auth/operations';
import * as yup from 'yup';
import { StyledContainer } from './RegisterPage.styled';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';

// Create a minimum validation for the form
const schema = yup
  .object({
    name: yup.string().min(6).max(24).required(),
    email: yup.string().min(6).max(30).required(),
    password: yup.string().min(8).max(12).required(),
    // password2: yup.string().min(8).max(12).required(),
  })
  .required();

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(signup(data))
      .unwrap()
      .then()
      .catch(() => toast.error('Incorrect data entered'));
  };
  return (
    <StyledContainer>
      <Box
        component="form"
        sx={{
          border: '2px solid #FFF',
          borderRadius: 3,
          padding: '10px',
          marginTop: '10vh',
          minWidth: '250px',
          boxShadow: '1px 15px 10px 5px #FEFEFF',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Registration</h2>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <label>
            <TextField
              id="outlined-basic"
              label="Login"
              variant="outlined"
              type="text"
              placeholder="User Login"
              {...register('name')}
            />
            <span>{errors.name?.message}</span>
          </label>

          <label>
            <TextField
              id="outlined-basic"
              label="Email address"
              variant="outlined"
              type="email"
              placeholder="user@mail.com"
              {...register('email')}
            />
            <span>{errors.email?.message}</span>
          </label>

          <label>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              placeholder="********"
              {...register('password')}
            />
            <span>{errors.password?.message}</span>
          </label>
          <Tooltip title="Register now" placement="bottom">
            <Button type="submit">Register now</Button>
          </Tooltip>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default RegisterPage;
