import StackLayout from '@swiftpost/elysium/layouts/StackLayout';
import Stack from '@swiftpost/elysium/ui/base/Stack';
import Footer from '@/components/Footer';
import { staticTheme } from '@/styles/staticTheme';
import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import ContentFittedStack from '@swiftpost/elysium/ui/ContentFittedStack';
import Text from '@swiftpost/elysium/ui/base/Text';
import Image from '@swiftpost/elysium/ui/Image';
import { PostData } from '@/types';

const contentMaxWidth = staticTheme.breakpoints.values.lg;

// Example blog post data
const _blogPost: PostData = {
  title: 'My Awesome Blog Post',
  content: 'This is the content of my blog post...',
  date: '2023-10-27',
  image: 'https://example.com/image.jpg', // Replace with your image URL
  author: {
    name: 'John Doe',
  },
};

interface Props {
  post: PostData;
  children: React.ReactNode;
}

const BlogPostTemplate: React.FC<Props> = ({ post }) => {
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
                <Text variant="h1">{post.title}</Text>
                <Text>{post.date}</Text>
                {post.image && (
                  <Text>
                    <Image
                      source={post.image}
                      alt={post.title}
                      style={{ maxWidth: '100%' }}
                    />
                  </Text>
                )}
                {post.content}
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

export default BlogPostTemplate;
