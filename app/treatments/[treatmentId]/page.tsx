'use client';

import RestrictedRoute from '@hocs/RestrictedRoute';
import { Alert, Button } from 'antd';
import { TTreatment } from '@models/TTreatment';
import { TreatmentCard } from '@components/TreatmentCard';
import data from '@_mockdata_/mockdata.json';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

interface IProps {
  params: {
    treatmentId: string;
  };
}

export default function TreatmentPage({ params }: IProps) {
  const router = useRouter();
  const { treatmentId } = params;
  const treatmentDetails: TTreatment = data.find(
    (treatment: TTreatment) => treatment.id === parseInt(treatmentId)
  );

  return (
    <RestrictedRoute>
      <div className="container">
        <TreatmentCard treatment={treatmentDetails} />
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
