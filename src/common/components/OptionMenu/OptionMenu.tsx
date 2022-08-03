import React from 'react';

import { ListItemIcon } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';

import { ReturnComponentType } from 'common/types/ReturnComponentType';

type OptionMenuPropsType = {
  menuItems: Array<{
    title: string;
    icon: string;
    action: () => void;
  }>;
  children: ReturnComponentType;
};
export const OptionMenu: React.FC<OptionMenuPropsType> = ({
  menuItems,
  children,
}): ReturnComponentType => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ ml: 2 }}>
        {children}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menuItems.map(item => (
          <MenuItem key={item.title} onClick={item.action}>
            <ListItemIcon>
              <img src={item.icon} alt={item.title} />
            </ListItemIcon>
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
