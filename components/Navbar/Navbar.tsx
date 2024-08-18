'use client';

import React, { FC, useEffect, useState } from 'react';
import {
  InfoCircleFilled,
  NotificationFilled,
  PlusSquareOutlined,
  TrademarkCircleFilled,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Badge, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';
import styles from './Navbar.module.css';

type MenuItem = Required<MenuProps>['items'][number];

export const Navbar: FC = () => {
  const path = usePathname();

  const [current, setCurrent] = useState('');
  const router = useRouter();
  const { isAuth, userLogout } = useAuth();

  const items: MenuItem[] = [
    {
      label: 'Itilium',
      key: 'Itilium',
      icon: (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <Link target="_blank" href="https://itilium.ru/" rel="noreferrer">
          <InfoCircleFilled />
        </Link>
      ),
    },
    isAuth && path !== '/treatments'
      ? {
        label: 'Обращения',
        key: '/treatments',
        icon: <TrademarkCircleFilled />,
      }
      : null,
    isAuth
      ? {
        label: (
          <Badge
            count={15}
            size="small"
            offset={[10, -5]}
            className={styles.badge}
          >
            Уведомления
          </Badge>
        ),
        key: '/notifications',
        icon: <NotificationFilled />,
      }
      : null,
    isAuth
      ? {
        label: 'Новое обращение',
        key: '/treatments/create',
        icon: <PlusSquareOutlined />,
      }
      : null,
    isAuth
      ? {
        label: 'Выйти',
        key: '/',
        icon: <UserOutlined />,
        className: styles.logout,
      }
      : null,
  ];

  const onClick: MenuProps['onClick'] = (e: MenuItem) => {
    if (e.key === '/') userLogout();
    if (e.key === 'Itilium') return;
    setCurrent(e.key);
    router.push(e.key);
  };

  useEffect(() => {
    setCurrent('');
  }, [path]);

  return (
    <Menu
      key={current}
      className={styles.navbar}
      selectable={false}
      theme="dark"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
