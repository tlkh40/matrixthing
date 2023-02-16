import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { Input } from '@/components/input';
import { Modal } from '@/components/modal';
import { decode, matrixToArray, range } from '@/lib/matrix';
import { Form, Formik } from 'formik';
import { HomeIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { z } from 'zod';

export default function MatrixDecode() {
  const [elements, setElements] = useState<null | number>(null);
  const [showTable, setShowTable] = useState(false);
  const [showModal, setModal] = useState(false);
  const [result, setResult] = useState('');
  return (
    <div>
      <div className='flex justify-between mb-3 items-center'>
        <h2 className='text-3xl font-semibold'>decode</h2>
        <Link to='/' className='flex items-center justify-center h-12 w-12 bg-slate-800 rounded-full text-center text-white'>
          <HomeIcon className='mx-auto' />
        </Link>
      </div>
      <div className={showTable ? 'blur' : ''}>
        <form action="" onSubmit={(e) => {
          e.preventDefault()
          setShowTable(true)
        }}>
          <label className='text-sm font-medium leading-none text-slate-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Enter the amount of elements in the matrix
          </label>
          <Input name="elements" placeholder='4' type="number" value={String(elements)} onChange={(e) => setElements(parseInt(e.target.value))} />
          <Button className='mt-2' disabled={!z.number().min(1).multipleOf(2).safeParse(elements).success}>
            Next
          </Button>
        </form>
      </div>
      {showTable && (
        <div className='mt-4'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-2xl text-slate-50 font-semibold mb-2'>Step 2: input your data</h2>
            <Button onClick={() => setShowTable(false)}>Back</Button>
          </div>
          <Formik initialValues={{ data: [[], []] as number[][] }} onSubmit={(v) => {
            const decoded = decode(matrixToArray(v.data))
            setResult(decoded)
            setModal(true)
          }}>
            {({ values }) => (
              <Form>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        {range((elements ?? 0) / 2).map((v, i) => (
                          <th key={`${i}_col`} scope="col" className="px-6 py-4">
                            Col {i + 1}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {values.data.map((v, i) => (
                        <tr key={`${i}`}
                          className="px-6 py-4 font-medium whitespace-nowrap text-white bg-gray-800">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium whitespace-nowrap text-gray-400 bg-gray-700"
                          >
                            Row {i + 1}
                          </th>
                          {range((elements ?? 0) / 2).map((n, ic) => (
                            <td className="px-6 py-4" key={`r_${i}_${ic}`}>
                              <Field type="number" name={`data[${i}][${ic}]`} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button className='mt-2' type='submit'>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <Modal closeModal={() => setModal(false)} openModal={() => setModal(true)} isOpen={showModal} title='Decoded message'>
        <span className='text-white'>The message from the matrix is: </span>
        <code className='whitespace-pre block bg-black p-3 text-white font-mono font-semibold overflow-x-scroll'>
          {result}
        </code>
        <div className='mt-2'>
          <Button onClick={() => {
            setElements(0);
            setShowTable(false);
            setResult('');
            setModal(false);
          }}>Ok</Button>
        </div>
      </Modal>
    </div>
  )
}
