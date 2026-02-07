'use client';

import Text from '@swiftpost/elysium/ui/base/Text';
import Stack from '@swiftpost/elysium/ui/base/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { staticTheme } from '@/styles/staticTheme';
import Box from '@mui/material/Box';

const menuItems = ['Home', 'Blog', 'Portfolio', 'About', 'Contact'];

const MenuBar: React.FC = () => {
  return (
    <Stack direction="row" spacing={staticTheme.spacing(2)}>
      {menuItems.map((item) => (
        <Text key={item}>{item}</Text>
      ))}
    </Stack>
  );
};

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const paddingSize = 2;
  const MenuButton = () => (
    <MenuIcon
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    />
  );

  return (
    <Stack>
      <Stack position="relative" padding={2}>
        <MenuButton />
        <Stack
          position="absolute"
          alignItems="flex-end"
          direction="column"
          top={-paddingSize}
          right={-paddingSize}
          padding={paddingSize}
          sx={{
            backgroundColor: 'white',
            boxShadow: isOpen ? '0px 8px 12px rgba(0, 0, 0, 0.2)' : undefined,
          }}
        >
          <MenuButton />
          {isOpen && (
            <>
              {menuItems.map((item) => (
                <Stack key={item} padding={1}>
                  <Text>{item}</Text>
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

const Menu: React.FC = () => {
  return (
    <>
      <Box
        sx={(theme) => ({
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'block',
          },
        })}
      >
        <MenuBar />
      </Box>
      <Box
        sx={(theme) => ({
          display: 'none',
          [theme.breakpoints.down('md')]: {
            display: 'block',
          },
        })}
      >
        <HamburgerMenu />
      </Box>
    </>
  );
};

export default Menu;
