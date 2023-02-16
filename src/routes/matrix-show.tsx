import { range } from '@/lib/matrix'
import { HomeIcon } from 'lucide-react'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

export default function MatrixShow() {
    const { data } = useLoaderData() as { data: number[][] }
    return (
        <div>
            <div className='flex justify-between mb-3 items-center'>
                <h2 className='text-3xl font-semibold'>Result</h2>
                <Link to='/' className='flex items-center justify-center h-12 w-12 bg-slate-800 rounded-full text-center text-white'>
                    <HomeIcon className='mx-auto' />
                </Link>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                #
                            </th>
                            {range(data[0].length).map((v,i) => (
                                <th key={`${i}_col`} scope="col" className="px-6 py-4">
                                    Col {v + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => (
                            <tr key={`${i}`}
                                className="px-6 py-4 font-medium whitespace-nowrap text-white bg-gray-800">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-gray-400 bg-gray-700"
                                >
                                    Row {i + 1}
                                </th>
                                {v.map((n) => (
                                    <td className="px-6 py-4">{n}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
