import { AuthContext } from '@context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Что-то пошло не так. Попробуйте авторизоваться ещё раз');
  }
  return context;
};
