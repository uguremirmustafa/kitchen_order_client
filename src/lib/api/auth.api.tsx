import { useMutation, useQuery } from '@tanstack/react-query';
import { Res, User } from 'lib/types';
import axios from 'lib/utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';

export interface LoginParams {
  email: string;
  password: string;
}

async function login(params: LoginParams) {
  try {
    const { data } = await axios.post<Res<User>>('auth/login', params);
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
export async function register(params: LoginParams) {
  try {
    const { data } = await axios.post<Res<User>>('auth/register', params);
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
async function logout() {
  try {
    const { data } = await axios.post<Res<boolean>>('auth/logout');
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
async function getProfile() {
  try {
    const { data } = await axios.get<Res<User>>('auth/profile');
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

export const useLogin = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res?.data) {
        setUser(res?.data ?? null);
        navigate(from, { replace: true });
      }
    },
  });
  return mutation;
};

export const useLogout = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      if (res?.data) {
        setUser(null);
      } else {
        console.error('failed to remove the user');
      }
    },
  });
  return mutation;
};

export const useProfile = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    onSuccess: (data) => {
      setUser(data?.data ?? null);
    },
  });
  return query;
};
