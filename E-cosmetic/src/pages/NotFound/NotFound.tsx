import React from 'react'
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'

import './NotFound.scss'
import { Button } from 'antd'
const NotFound: React.FC = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <div className='not-found'>
      <img
        src={'https://mauwebsite.vn/wp-content/uploads/2021/10/404-page-not-found.png'}
        alt='notFound'
        className='img-404'
      />
      <Button type='primary' onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  )
}

export default NotFound
