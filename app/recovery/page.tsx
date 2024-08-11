'use client';

import React, { FC } from 'react';
import { Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './RecoveryPage.module.css';

const RecoveryPage: FC = () => {
  const router = useRouter();
  return (
    <div className="container">
      <Typography.Title className="title">
        Тут должна быть форма восстановления пароля!
      </Typography.Title>
      <div className={styles.back}>
        <Button onClick={() => router.push('/')}>
          <ArrowLeftOutlined />
          На страницу входа
        </Button>
      </div>
    </div>
  );
};

export default RecoveryPage;
