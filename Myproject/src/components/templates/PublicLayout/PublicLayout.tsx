/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  return <Outlet />;
};

export default PublicLayout;
