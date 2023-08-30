import { useAuth } from 'components/wrappers/auth-wrapper';

function ProfilePage(): JSX.Element {
  const { user } = useAuth();
  return (
    <div>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ProfilePage;
