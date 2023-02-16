import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { Input } from '@/components/input';
import { range } from '@/lib/matrix';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'

export default function MatrixDecode() {
  const [elements, setElements] = useState<null | number>(null);
  const [showTable, setShowTable] = useState(false);
  return (
    <div>
      <div className={showTable ? 'blur' : ''}>
        <label className='text-sm font-medium leading-none text-slate-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
          Enter the amount of elements in the matrix
        </label>
        <Input name="elements" placeholder='4' type="number" value={String(elements)} onChange={(e) => setElements(parseInt(e.target.value))} />
        <Button className='mt-2' disabled={((elements ?? 0) % 2 !== 0) && (elements ?? 0) > 1 && !showTable} onClick={() => setShowTable(true)}>
          Next
        </Button>
      </div>
      {showTable && (
        <div className='mt-4'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-2xl text-slate-50 font-semibold mb-2'>Step 2: input your data</h2>
            <Button onClick={() => setShowTable(false)}>Back</Button>
          </div>
          <Formik initialValues={{ data: [[], []] as number[][] }} onSubmit={(v) => { console.log(v) }}>
            {({ values }) => (
              <Form>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        {range(elements ?? 0).map((v, i) => (
                          <th key={`${i}_col`} scope="col" className="px-6 py-4">
                            Col {v + 1}
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
                          {range(elements ?? 0).map((n, i) => (
                            <td className="px-6 py-4">
                              <Field type="number" name={`data[${i}][${i}]`} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button className='mt-2'>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  )
}
