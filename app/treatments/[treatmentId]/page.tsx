'use client';

import RestrictedRoute from '@hocs/RestrictedRoute';
import { Alert, Button, Spin } from 'antd';
import { TreatmentCard } from '@components/TreatmentCard';
// import data from '@_mockdata_/mockdata.json';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useGetTreatmentQuery } from '@store/query/TreatmentQuery/TreatmentQuery';

interface IProps {
  params: {
    treatmentId: string;
  };
}

export default function TreatmentPage({ params }: IProps) {
  const router = useRouter();
  const { treatmentId } = params;
  const { data: treatmentDetails, isSuccess } = useGetTreatmentQuery(
    Number(treatmentId)
  );

  return (
    <RestrictedRoute>
      <div className="container">
        {isSuccess ? <TreatmentCard treatment={treatmentDetails} /> : <Spin />}
        <Alert
          className="alert"
          message="У вас остались вопросы? Пожалуйста, создайте новое обращение."
          type="info"
          showIcon
          action={
            <Button
              onClick={() => router.push('/treatments/create')}
              size="large"
              type="text"
            >
              <PlusOutlined /> Создать
            </Button>
          }
        />
      </div>
    </RestrictedRoute>
  );
}
