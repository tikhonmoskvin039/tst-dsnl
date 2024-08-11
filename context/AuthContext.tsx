'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { TUserLoginData } from '@models/TUserLoginData';

interface IAuthContext {
  isAuth: boolean;
  authError: boolean;
  userLogin: (userData: TUserLoginData) => void;
  userLogout: () => void;
  setAuthError: Dispatch<SetStateAction<boolean>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);

  const [cookies, setCookie, removeCookie] = useCookies(['isAuth']);
  const router = useRouter();

  const userLogin = ({ login, password }: TUserLoginData) => {
    const isValidUserData =
      (login === 'gavrilov' && password === '111aaa') ||
      (login === 'fedorov' && password === '222bbb');

    if (isValidUserData) {
      setCookie('isAuth', true, {
        path: '/',
        domain: `localhost`,
        maxAge: 3600,
      });
      setIsAuth(true);
      router.push('/treatments');
    } else {
      setAuthError(true);
    }
  };

  const userLogout = () => {
    removeCookie('isAuth');
    setIsAuth(false);
    router.push('/');
  };

  useEffect(() => {
    const loggedInUser = cookies.isAuth;
    if (loggedInUser) {
      setIsAuth(true);
    }
  }, [cookies.isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        authError,
        userLogin,
        userLogout,
        setAuthError,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
