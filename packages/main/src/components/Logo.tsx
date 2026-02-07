import Text from '@swiftpost/elysium/ui/base/Text';

interface Props {
  fontSize?: number;
  nested?: boolean;
}

const Logo: React.FC<Props> = ({ fontSize, nested }) => (
  <Text
    variant={nested ? 'inherit' : 'h3'}
    fontSize={fontSize}
    {...(nested === true && { component: 'span' })}
  >
    <Text
      variant={nested ? 'inherit' : 'h3'}
      component="span"
      fontWeight="bold"
      color="primary.main"
      fontSize={fontSize}
    >
      S
    </Text>
    wift
    <Text
      variant={nested ? 'inherit' : 'h3'}
      component="span"
      fontWeight="bold"
      color="primary.main"
      fontSize={fontSize}
    >
      P
    </Text>
    ost
  </Text>
);

export default Logo;
