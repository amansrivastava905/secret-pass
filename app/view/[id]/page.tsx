import ViewSecret from '@/components/sections/view-secret';
import React from 'react';

const ViewPage = async ({ params }: { params: { id: string } }) => {
  return <ViewSecret id={params.id} />;
};

export default ViewPage;
