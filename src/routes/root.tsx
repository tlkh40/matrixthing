import React from 'react'
import { EncodeMatrix } from '@/components/modals/encodeMatrix';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/button';

function Root() {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className='text-3xl font-semibold text-slate-50'>Matrix encode / decoder</h2>
      <div className='flex mt-2 gap-2'>
        <EncodeMatrix />
        <Button onClick={() => navigate('/decode')}>
          Decode
        </Button>
      </div>
    </div>
  )
}

export default Root
