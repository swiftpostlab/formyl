import { staticTheme } from '@/styles/staticTheme';
import Stack from '@swiftpost/elysium/ui/base/Stack';

const TopBar = () => {
  return (
    <Stack
      height={staticTheme.spacing(4)}
      width="100%"
      sx={{
        backgroundColor: 'primary.dark',
      }}
    />
  );
};

export default TopBar;
