'use client';

import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { TUserLoginData } from '@models/TUserLoginData';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/navigation';
import styles from './AuthForm.module.css';

type FieldType = {
  login?: string;
  password?: string;
  remember?: string;
};

const initialFormValues: TUserLoginData = {
  login: '',
  password: '',
};

export const AuthForm: FC = () => {
  const [userData, setUserData] = useState<TUserLoginData>(initialFormValues);
  const router = useRouter();
  let { userLogin, authError, setAuthError } = useAuth();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    userLogin(userData);
  };

  const handleLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo: string,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const handleAuth = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    userLogin(userData);
  };

  useEffect(() => {
    if (authError) {
      setTimeout(() => {
        setAuthError(false);
      }, 3000);
    }
  }, [authError]);

  return (
    <>
      <div className="container">
        <h1 className={styles.title}>Вход в сервис</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          className={styles.form}
        >
          <Form.Item<FieldType>
            name="login"
            rules={[
              {
                required: true,
                message: 'Пожалуйста введите имя пользователя!',
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Имя пользователя"
              name="login"
              onChange={handleLoginData}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="password"
            rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
          >
            <Input.Password
              size="large"
              placeholder="Пароль"
              name="password"
              onChange={handleLoginData}
            />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item className={styles.submit}>
            <Button onSubmit={handleAuth} type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
        {authError && (
          <Typography.Text className={styles.error} type="danger" strong>
            {' '}
            Неверные данные при авторизации, пожалуйста повторите попытку.
          </Typography.Text>
        )}
      </div>
      <div className={styles.footer}>
        <Button type="link" onClick={() => router.push('/recovery')}>
          Забыли пароль?
        </Button>
      </div>
    </>
  );
};
