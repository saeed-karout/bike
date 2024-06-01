// src/components/Loading.tsx
import React from 'react';
import './loading.css'; // تأكد من أن ملف CSS موجود في المسار الصحيح

const Loading: React.FC = () => {
  return (
    <div className='spinner-container'>
        <div className='spinner'></div>
    </div>
  )
}

export default Loading;
