import { LoginParams, useLogin, useLogout } from 'lib/api/auth.api';
import useLocalState from 'lib/hooks/useLocalState';
import { User } from 'lib/types';
import { createContext, useContext, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface InitialValues {
  user: User | null;
  signin: (params: LoginParams) => void;
  logout: () => void;
}

const initialValues: InitialValues = {
  user: null,
  signin: () => {},
  logout: () => {},
};

const Context = createContext<InitialValues>(initialValues);

interface IProps {
  children: ReactNode;
}

export const AuthWrapper = (props: IProps) => {
  const { children } = props;
  const [user, setUser] = useLocalState<InitialValues['user']>('auth-user', null);
  const loginMutation = useLogin(setUser);
  const logoutMutation = useLogout(setUser);
  function signin(params: LoginParams) {
    loginMutation.mutate(params);
  }

  function logout() {
    logoutMutation.mutate();
  }

  const value = { signin, logout, user };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}

export const useAuth = () => {
  const context = useContext(Context);

  return context;
};

export const useUser = () => {
  const context = useContext(Context);

  return context.user;
};
