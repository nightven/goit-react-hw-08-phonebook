import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import { selectUser } from 'redux/auth/selectors';
import { Box, IconButton, Tooltip } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';

const UserMenu = () => {
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        color: 'green',
      }}
    >
      <p>Welcome, {name}. </p>
      <Tooltip title="LogOut" placement="bottom">
        <IconButton
          type="button"
          size="small"
          sx={{ border: 1, borderRadius: 2, color: 'red' }}
          onClick={() => dispatch(logOut())}
        >
          <LogoutOutlined />
          LogOut
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UserMenu;
