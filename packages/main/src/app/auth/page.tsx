import SimplePageTemplate from '@/templates/SimplePageTemplate';
import AuthClientWrapper from './AuthClientWrapper';

const AuthPage: React.FC = () => {
  return (
    <SimplePageTemplate>
      <AuthClientWrapper />
    </SimplePageTemplate>
  );
};

export default AuthPage;
