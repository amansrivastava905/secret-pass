import React from 'react';
import Container, { ContainerHeader } from '../ui/container';

const ViewSecret = () => {
  return (
    <Container
      extraTopPadding
      className="bg-secondary xl:rounded-b-3xl min-h-screen xl:min-h-[90vh] text-center">
      <ContainerHeader className="max-w-3xl mx-auto py-10">
        View{' '}
        <span className="text-primary underline decoration-wavy decoration-destructive text-nowrap">
          SecretPass
        </span>
      </ContainerHeader>
      <div className="max-w-3xl mx-auto space-y-5"></div>
    </Container>
  );
};

export default ViewSecret;
