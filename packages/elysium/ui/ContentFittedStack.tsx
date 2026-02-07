import { React } from 'next/dist/server/route-modules/app-page/vendored/rsc/entrypoints';
import Stack, { StackProps } from './base/Stack';
import { InferSlotsFromSlotProps } from './types';

type ContainerProps = StackProps;

interface SlotProps {
  container?: ContainerProps;
}

interface Props extends Exclude<StackProps, 'maxWidth' | 'width'> {
  contentMaxWidth: StackProps['maxWidth'];
  slotProps?: SlotProps;
  slots?: InferSlotsFromSlotProps<SlotProps>;
}

/**
 * Special stack to fit its content within a given width while maintaining the content alignment (centered by default).
 */
const ContentFittedStack: React.FC<Props> = ({
  slots,
  slotProps,
  contentMaxWidth,
  children,
  ...otherContentStackProps
}) => {
  const Container = slots?.container ?? Stack;
  const containerProps = slotProps?.container;
  return (
    <Container
      width="100%"
      alignItems={containerProps?.alignItems ?? 'center'}
      {...containerProps}
    >
      <Stack
        width="100%"
        maxWidth={contentMaxWidth}
        {...otherContentStackProps}
      >
        {children}
      </Stack>
    </Container>
  );
};

export type ContentFittedStackProps = Props;
export default ContentFittedStack;
