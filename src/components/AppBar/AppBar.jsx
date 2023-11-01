import AuthNav from 'components/AuthNav/AuthNav';
import Navigation from 'components/Navigations/Navigations';
import UserMenu from 'components/UserMenu/UserMenu';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { Box } from '@mui/material';
import { StyledContainer } from './AppBar.styled';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>
      <StyledContainer
      >
        <nav>
          <Box component="ul" sx={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-between', alineContent: 'center', margin: "20px 20px"}}>
            <li>
              <Navigation />
            </li>
            <li>{isLoggedIn ? <UserMenu /> : <AuthNav />}</li>
          </Box>
        </nav>
      </StyledContainer>
      <hr />
    </header>
  );
};

export default AppBar;
