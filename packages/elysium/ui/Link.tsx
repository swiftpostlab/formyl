import BaseLink from '@swiftpost/elysium/ui/base/Link';
import NextLink from 'next/link';
import type { SxProps } from '../ui/types';
import { spreadSx } from '../utils/styles/sxProps';

interface Props {
  href: string;
  children: React.ReactNode;
  inheritStyle?: boolean;
  external?: boolean;
  blank?: boolean;
  sx?: SxProps;
}

const Link: React.FC<Props> = ({
  href,
  children,
  external,
  inheritStyle,
  blank,
  sx,
}) => {
  return (
    <BaseLink
      href={href}
      {...(!external && { component: NextLink })}
      {...(inheritStyle && {
        color: 'inherit',
        fontWeight: 'inherit',
      })}
      {...(blank && { target: '_blank' })}
      sx={[
        {
          '&:hover': {
            color: 'primary.light',
          },
        },
        ...spreadSx(sx),
      ]}
    >
      {children}
    </BaseLink>
  );
};

export type LinkProps = Props;
export default Link;
