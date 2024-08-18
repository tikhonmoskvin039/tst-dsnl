'use client';

import {
  FormProps,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from 'antd';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FC } from 'react';
import styles from './CreateForm.module.css';
import { useAddTreatmentMutation } from '@store/query/TreatmentQuery/TreatmentQuery';
import moment from 'moment';

type TTreatmentData = {
  theme: string;
  description: string;
  service: string;
  serviceContent: string;
  deadline: moment.Moment | null; // Исправлено тип для использования с moment
  id: string;
};

const initialFormValues: TTreatmentData = {
  theme: '',
  description: '',
  service: '',
  serviceContent: '',
  deadline: null, // Исправлено начальное значение
  id: '',
};

type FieldType = {
  theme: string;
  description: string;
  service: string;
  serviceContent: string;
  deadline: moment.Moment | null; // Исправлено тип для использования с moment
  id: string;
};

const CreateForm: FC = () => {
  const [addTreatment, { isLoading, isError }] = useAddTreatmentMutation();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = (values: TTreatmentData) => {
    console.log('Form submitted with:', values);
    if (values.deadline) {
      values.deadline = values.deadline.format('DD.MM.YYYY HH:mm');
    }
    values.id = String(Date.now())
    addTreatment(values).then(() => {
      form.resetFields();
      router.push('/treatments');
    });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    form.setFieldsValue({ [name]: value });
  };

  const handleDateChange = (value: moment.Moment | null) => {
    form.setFieldsValue({ deadline: value });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo: string,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const disabledDate = (current: moment.Moment) => {
    // Can not select days before today
    return current < moment().endOf('day');
  };

  const disabledTime = (current: moment.Moment) => {
    if (!current || !current.isSame(moment(), 'day')) {
      return false;
    }
    // Disallow times before current time
    return {
      disabledHours: () => [...Array(24).keys()].filter(hour => hour < moment().hour()),
      disabledMinutes: () => [...Array(60).keys()].filter(minute => minute < moment().minute())
    };
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Создать обращение</h1>
      <Form
        form={form}
        name="basic"
        initialValues={initialFormValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        className={styles.form}
      >
        <div className={styles.select_block}>
          <Form.Item name="service">
            <Select
              className={styles.select_item}
              placeholder="Выберите сервис"
              style={{ width: 240 }}
              onChange={handleSelectChange('service')}
            >
              <Select.Option value="Интернет">Интернет</Select.Option>
              <Select.Option value="Поддержка рабочих мест">Поддержка рабочих мест</Select.Option>
              <Select.Option value="Поддержка оборудования">Поддержка оборудования</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="serviceContent">
            <Select
              placeholder="Выберите контент сервиса"
              style={{ width: 240 }}
              onChange={handleSelectChange('serviceContent')}
            >
              <Select.Option value="Настройка ПО">Настройка ПО</Select.Option>
              <Select.Option value="Настройка оборудования">Настройка оборудования</Select.Option>
              <Select.Option value="Доступ">Доступ</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="theme"
          rules={[{ required: true, message: 'Пожалуйста введите тему!' }]}
        >
          <Input
            size="large"
            placeholder="Введите тему"
          />
        </Form.Item>

        <Form.Item name="description">
          <Input
            size="large"
            placeholder="Введите описание"
          />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Дата и Время"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату и время!' }]}
        >
          <DatePicker
            showTime
            format="DD.MM.YYYY HH:mm"
            disabledDate={disabledDate}
            disabledTime={disabledTime}
            style={{ width: '100%' }}
            placeholder="Выберите дату и время"
            onChange={handleDateChange}
          />
        </Form.Item>

        <Form.Item className={styles.submit}>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
