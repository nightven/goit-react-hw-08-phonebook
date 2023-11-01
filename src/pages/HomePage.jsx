import { useAuth } from 'hooks/useAuth';
import React from 'react';
import book from '../images/book-list.png';
import { Link, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { StyledContainer } from './HomePage.styled';

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn && <Navigate to={'/phonebook'} />}
      <StyledContainer>
        <Box
          component="div"
          sx={{
            fontSize: '34px',
            maxWidth: '750px',
            marginTop: '10vh',
          }}
        >
          <span>Welcome to the contact book. To enter the book, please </span>
          <Link to="/register">register</Link>
          <span> or </span>
          <Link to="/login">log in</Link>
          <span> to your account</span>
        </Box>
        <Box
          sx={{
            border: '3px solid #FFF',
            borderRadius: 3,
            overflow: 'hidden',
            marginTop: '40px',
            boxShadow: '1px 15px 10px 5px #FEFEFF',
          }}
        >
          <img src={book} alt="book list" width="600px" />
        </Box>
      </StyledContainer>
    </>
  );
};

export default HomePage;
