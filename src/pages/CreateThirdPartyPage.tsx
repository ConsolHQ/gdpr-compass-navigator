import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateThirdParty from '@/components/company/CreateThirdParty';

const CreateThirdPartyPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/company/third-parties');
  };

  return <CreateThirdParty onBack={handleBack} />;
};

export default CreateThirdPartyPage;