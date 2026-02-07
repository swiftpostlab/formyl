import type { InferSlotsFromSlotProps, SxProps } from '../ui/types';
import { spreadSx } from '../utils/styles/sxProps';
import Stack from '../ui/base/Stack';
import Box from '../ui/base/Box';
import { memo } from 'react';

const componentBaseName = 'stack-layout';

interface SlotProps {
  mainContainer: {
    children: React.ReactNode;
    sx?: SxProps;
  };
  footerContainer?: {
    children: React.ReactNode;
    sx?: SxProps;
  };
}

interface Props {
  slots?: Partial<InferSlotsFromSlotProps<SlotProps>>;
  slotProps: SlotProps;
  sx?: SxProps;
}

/**
 * A simple stack layout with an optional footer sticked at the bottom.
 */
const StackLayout: React.FC<Props> = ({ slots, slotProps, sx }) => {
  const MainContainer = slots?.mainContainer ?? Box;
  const FooterContainer = slots?.footerContainer ?? Box;

  return (
    <Stack
      className={componentBaseName}
      sx={[{ height: '100%', width: '100%' }, ...spreadSx(sx)]}
    >
      <MainContainer
        className={`${componentBaseName}-container`}
        sx={[
          { height: '100%', width: '100%' },
          ...spreadSx(slotProps.mainContainer.sx),
        ]}
      >
        {slotProps.mainContainer.children}
      </MainContainer>
      {slotProps.footerContainer != null && (
        <FooterContainer
          className={`${componentBaseName}-footer`}
          sx={[{ width: '100%' }, ...spreadSx(slotProps.footerContainer.sx)]}
        >
          {slotProps.footerContainer.children}
        </FooterContainer>
      )}
    </Stack>
  );
};

export type StackLayoutProps = Props;
export default memo(StackLayout);
