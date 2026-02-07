import StackLayout from '@swiftpost/elysium/layouts/StackLayout';
import Stack from '@swiftpost/elysium/ui/base/Stack';
import Footer from '@/components/Footer';
import { staticTheme } from '@/styles/staticTheme';
import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import ContentFittedStack from '@swiftpost/elysium/ui/ContentFittedStack';

const contentMaxWidth = staticTheme.breakpoints.values.lg;

interface Props {
  children: React.ReactNode;
}

const SimplePageTemplate: React.FC<Props> = ({ children }) => {
  return (
    <StackLayout
      slotProps={{
        mainContainer: {
          children: (
            <Stack>
              <TopBar />
              <Header contentMaxWidth={contentMaxWidth} />
              <ContentFittedStack
                component="main"
                id="main"
                marginX={staticTheme.spacing(2)}
                contentMaxWidth={contentMaxWidth}
              >
                {children}
              </ContentFittedStack>
            </Stack>
          ),
        },
        footerContainer: {
          children: <Footer contentMaxWidth={contentMaxWidth} />,
        },
      }}
    />
  );
};

export default SimplePageTemplate;
