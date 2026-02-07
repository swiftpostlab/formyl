import { staticTheme } from '@/styles/staticTheme';
import Text from '@swiftpost/elysium/ui/base/Text';
import ContentFittedStack from '@swiftpost/elysium/ui/ContentFittedStack';
import type { ContentFittedStackProps } from '@swiftpost/elysium/ui/ContentFittedStack';
import Link from '@swiftpost/elysium/ui/Link';
import { customConfig } from '@/customConfig';

interface Props {
  contentMaxWidth: ContentFittedStackProps['contentMaxWidth'];
}

const currentYear = new Date().getFullYear();

const Attribution = () => (
  <Text color="primary.contrastText" gutterBottom>
    {`Template from `}
    <Link
      inheritStyle
      href="https://github.com/swiftpostlab/swiftpost-site-template"
      blank
    >
      {`SwiftPost template.`}
    </Link>
  </Text>
);

const Footer: React.FC<Props> = ({ contentMaxWidth }) => {
  return (
    <ContentFittedStack
      component="footer"
      id="footer"
      minHeight={staticTheme.spacing(6)}
      alignItems="center"
      contentMaxWidth={contentMaxWidth}
      margin={staticTheme.spacing(2)}
      slotProps={{
        container: {
          sx: {
            backgroundColor: 'black',
          },
        },
      }}
    >
      <Text color="primary.contrastText" gutterBottom>
        {`Copyright © ${currentYear} ${customConfig.author.name}.`}
      </Text>
      <Attribution />
    </ContentFittedStack>
  );
};

export type FooterProps = Props;
export default Footer;
