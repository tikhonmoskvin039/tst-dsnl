import { TTreatment } from '@models/TTreatment';
import { Divider, Input, Modal } from 'antd';
import React, { ChangeEvent, Dispatch, FC } from 'react';

interface IProps {
  isEditing: boolean;
  resetEditing: () => void;
  setTreatments: Dispatch<React.SetStateAction<TTreatment[]>>;
  editingRecord: TTreatment | null;
  setEditingRecord: Dispatch<React.SetStateAction<TTreatment | null>>;
}

const TreatmentEditModal: FC<IProps> = ({
  editingRecord,
  isEditing,
  resetEditing,
  setEditingRecord,
  setTreatments,
}) => {
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
  return (
    <Modal
      title="Редактировать обращение"
      okText="Сохранить"
      cancelText="Отменить"
      open={isEditing}
      onCancel={resetEditing}
      onOk={handleSetTreatments}
    >
      <Input
        value={editingRecord?.theme}
        name="theme"
        onChange={handleSetEditingRecord}
      />
      <Divider />
      <Input
        value={editingRecord?.deadline}
        name="deadline"
        onChange={handleSetEditingRecord}
      />
      <Divider />
      <Input
        value={editingRecord?.description}
        name="description"
        onChange={handleSetEditingRecord}
      />
      <Divider />
    </Modal>
  );
};

export default TreatmentEditModal;
