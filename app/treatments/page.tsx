'use client';

import RestrictedRoute from '@hocs/RestrictedRoute';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
// import data from '@_mockdata_/mockdata.json';
import { TTreatment } from '@models/TTreatment';
import { InputRef, Modal, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FilterConfirmProps } from 'antd/es/table/interface';
import TreatmentEditModal from '@components/TreatmentEditModal/TreatmentEditModal';
import { getColumnSearchProps } from '@helpers/customTableSearch';
import {
  useGetAllTreatmentsQuery,
  useRemoveTreatmentMutation,
} from '@store/query/TreatmentQuery/TreatmentQuery';
import styles from './TreatmentsPage.module.css';

interface IProps {
  params: {
    treatmentId: string;
  };
}

type DataIndex = keyof TTreatment;

const TreatmentsPage: FC<IProps> = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TTreatment | null>(null);
  const { data: dataTreatments, isLoading } = useGetAllTreatmentsQuery({});
  const [removeTreatment] = useRemoveTreatmentMutation({});
  const [treatments, setTreatments] = useState<TTreatment[]>(dataTreatments);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const onDeleteTreatment = (record: TTreatment) => {
    Modal.confirm({
      title: 'Вы уверены что хотите удалить обращение?',
      okText: 'Да',
      cancelText: 'Нет',
      okType: 'danger',
      onOk: () => {
        removeTreatment(record.id);
        setTreatments((prev) =>
          prev.filter((treatment) => treatment.id !== record.id)
        );
      },
    });
  };

  function onEditTreatment(record: TTreatment) {
    setIsEditing(true);
    setEditingRecord({ ...record });
  }

  const resetEditing = () => {
    setEditingRecord(null);
    setIsEditing(false);
  };

  const columns = [
    {
      title: 'Тема',
      dataIndex: 'theme',
      key: 'theme',
      ...getColumnSearchProps(
        'theme',
        searchInput,
        handleSearch,
        handleReset,
        searchedColumn,
        searchText
      ),
    },
    {
      title: 'Номер',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['sm'],
    },
    {
      title: 'Дата изменения',
      dataIndex: 'modifiedAt',
      key: 'modifiedAt',
      responsive: ['sm'],
    },
    {
      title: 'Крайний срок',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Состояние',
      dataIndex: 'status',
      key: 'status',
      responsive: ['sm'],
      filters: [
        { text: 'В работе', value: 'В работе' },
        { text: 'Зарегистрировано', value: 'Зарегистрировано' },
        { text: 'На согласовании', value: 'На согласовании' },
        { text: 'Выполнено', value: 'Выполнено' },
        { text: 'Закрыто', value: 'Закрыто' },
      ],
      onFilter: (value: string, record: TTreatment) =>
        record.status.includes(value),
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: 'Действия',
      responsive: ['sm'],
      render: (_: unknown, record: TTreatment) => (
        <Fragment key={record?.id}>
          <EditOutlined onClick={() => onEditTreatment(record)} />
          <DeleteOutlined
            onClick={() => onDeleteTreatment(record)}
            style={{ color: 'red', marginLeft: 12, cursor: 'pointer' }}
          />
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    if (dataTreatments) setTreatments(dataTreatments);
  }, [dataTreatments]);

  return (
    <RestrictedRoute>
      <div className="container">
        <Table
          rowKey="id"
          dataSource={treatments}
          columns={columns}
          pagination={{ pageSize: 3 }}
          size="large"
          className={styles.table}
          virtual
          loading={isLoading}
          scroll={{ x: 100, y: 500 }}
        />
        <TreatmentEditModal
          isEditing={isEditing}
          resetEditing={resetEditing}
          setTreatments={setTreatments}
          editingRecord={editingRecord}
          setEditingRecord={setEditingRecord}
        />
      </div>
    </RestrictedRoute>
  );
};

export default TreatmentsPage;
