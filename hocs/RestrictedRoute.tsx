'use client';

import { FC, ReactNode, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

interface IProps {
  children: ReactNode;
}

const RestrictedRoute: FC<IProps> = ({ children }) => {
  const [cookies] = useCookies(['isAuth']);
  const isAuth = cookies.isAuth;
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  return <>{children}</>;
};

export default RestrictedRoute;
