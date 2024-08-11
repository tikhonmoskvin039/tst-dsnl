import { CaretRightOutlined, QqCircleFilled } from '@ant-design/icons';
import { TTreatment } from '@models/TTreatment';
import {
  Card,
  Col,
  Collapse,
  Divider,
  notification,
  Row,
  Typography,
} from 'antd';
import React, { FC, useEffect, useState } from 'react';
const { Panel } = Collapse;
import styles from './TreatmentCard.module.css';
import { NotificationPlacement } from 'antd/es/notification/interface';

interface IProps {
  treatment: TTreatment;
}

export const TreatmentCard: FC<IProps> = ({
  treatment,
}: {
  treatment: TTreatment;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Внимание`,
      description: 'Это обращение отмечено как ожидающее ответа.',
      placement,
    });
  };

  useEffect(() => {
    if (treatment.isWaitingForAnswer === 'Да') {
      openNotification('top');
    }
  }, []);

  const handleOpen = (): void => {
    setIsOpen((open: boolean) => !open);
  };

  return (
    <Card key={treatment.id} className={styles.card}>
      {contextHolder}
      <Row>
        <Col xs={24} md={12} lg={12}>
          <Typography.Text type="secondary">
            Обращение {treatment.id} от {treatment.createdAt}
          </Typography.Text>
          <br />
          <Typography.Text strong>{treatment.theme}</Typography.Text>
          <Divider className={styles.divider} />
          <Typography.Text italic>{treatment.description}</Typography.Text>
          <Divider className={styles.divider} />
        </Col>
        <Col xs={24} md={12} lg={12}>
          <Typography.Text type="secondary">Статус:</Typography.Text>
          <br />
          <QqCircleFilled /> {treatment.status}
          <br />
          <br />
          <Typography.Text type="secondary">Крайний срок:</Typography.Text>
          <br />
          {treatment.deadline}
          <Divider className={styles.divider} />
          <Typography.Text type="secondary">Решение:</Typography.Text>
          {treatment.decision}
          <Divider className={styles.divider} />
        </Col>
      </Row>
      <Collapse
        bordered={false}
        onChange={handleOpen}
        defaultActiveKey={['0']}
        expandIcon={({ isActive }: { isActive: boolean }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className={styles.collapse}
      >
        <Panel
          header={
            isOpen
              ? 'Скрыть дополнительную информацию'
              : 'Показать дополнительную информацию'
          }
          key="1"
        >
          <p>Сервис обращения: {treatment.service}</p>
          <p>Содержание: {treatment.serviceContent}</p>
        </Panel>
      </Collapse>
    </Card>
  );
};
