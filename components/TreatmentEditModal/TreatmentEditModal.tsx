import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from 'react';
import { TTreatment } from '@models/TTreatment';
import { Form, Input, Modal, FormProps, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useEditTreatmentMutation } from '@store/query/TreatmentQuery/TreatmentQuery';

interface IProps {
  isEditing: boolean;
  resetEditing: () => void;
  setTreatments: Dispatch<React.SetStateAction<TTreatment[]>>;
  editingRecord: TTreatment;
  setEditingRecord: Dispatch<React.SetStateAction<TTreatment | null>>;
}

type FieldType = {
  theme: string;
  description: string;
  service: string;
  serviceContent: string;
  deadline: Moment | null; // Исправлено тип для использования с moment
};

type TTreatmentData = {
  theme: string;
  description: string;
  service: string;
  serviceContent: string;
  deadline: Moment | null; // Исправлено тип для использования с moment
};

const TreatmentEditModal: FC<IProps> = ({
  editingRecord,
  isEditing,
  resetEditing,
  setEditingRecord,
  setTreatments,
}) => {
  const [form] = Form.useForm();
  const [editTreatment, { isError, isLoading }] = useEditTreatmentMutation();

    const handleSetEditingRecord = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingRecord((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSetTreatments = () => {
    setTreatments(
      (prev) =>
        prev.length &&
        prev.map((treatment) => {
          if (treatment.id === editingRecord.id) {
            return editingRecord;
          }
          return treatment;
        }),
    );
    resetEditing();
  };

  useEffect(() => {
    if (isEditing && editingRecord) {
      form.setFieldsValue({
        theme: editingRecord.theme,
        description: editingRecord.description,
        service: editingRecord.service,
        serviceContent: editingRecord.serviceContent,
        deadline: editingRecord.deadline ? moment(editingRecord.deadline, 'DD.MM.YYYY HH:mm') : null,
      });
    }
  }, [isEditing, editingRecord]);

  const onFinish: FormProps<FieldType>['onFinish'] = (values: TTreatment) => {
    console.log('Form submitted with:', values);
    if (values.deadline) {
      values.deadline = values.deadline.format('DD.MM.YYYY HH:mm');
    }
  // Создайте объект с id и body
  const updatedTreatment = {
    id: editingRecord.id, // Убедитесь, что id существует и правильно установлен
    body: values
  };

  editTreatment(updatedTreatment).then(() => {
    form.resetFields();
    resetEditing();
  });
  };

  const handleDateChange = (value: Moment | null) => {
    form.setFieldsValue({ deadline: value });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo: string,
  ) => {
    console.log('Failed:', errorInfo);
  };

  const disabledDate = (current: Moment) => {
    // Can not select days before today
    return current < moment().endOf('day');
  };

  const disabledTime = (current: Moment) => {
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
    <Modal
      title="Редактировать обращение"
      okText="Сохранить"
      cancelText="Отменить"
      open={isEditing}
      onCancel={resetEditing}
      onOk={() => {
        form.submit()
        handleSetTreatments()
      }}
      loading={isLoading}
      //  onCancel={resetEditing}
      // onOk={handleSetTreatments}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item name="theme">
          <Input
            name="theme"
        onChange={handleSetEditingRecord}
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

        <Form.Item name="description">
          <Input
            name="description"
            onChange={handleSetEditingRecord}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TreatmentEditModal;

