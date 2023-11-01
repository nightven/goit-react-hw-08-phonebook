import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import toast from 'react-hot-toast';
import { StyledContainer } from './LoginPage.styled';
import { Box, Button, TextField, Tooltip } from '@mui/material';

const schema = yup
  .object({
    email: yup.string().min(6).max(24).required(),
    password: yup.string().min(8).max(12).required(),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const onSubmit = data => {
    dispatch(logIn(data))
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
        <h2>Login</h2>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email adress"
            variant="outlined"
            type="email"
            placeholder="user@mail.com"
            {...register('email')}
          />
          <span>{errors.login?.message}</span>
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
          <Tooltip title="Login" placement="bottom">
            <Button type="submit">Login</Button>
          </Tooltip>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default LoginPage;
