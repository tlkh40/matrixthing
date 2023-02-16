import { useField } from 'formik'
import React, { ComponentProps } from 'react'
import { Input } from './input'

interface FieldProps {
    label?: string
    description?: string
}

export const Field = ({ name, label, description, ...props }: ComponentProps<typeof Input> & FieldProps) => {
    const [field, { error, touched }] = useField(name || '');
    return (
        <div className='flex flex-col gap-y-1'>
            <label htmlFor={name} className='text-sm font-medium leading-none text-slate-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>{label}</label>
            <Input {...field} {...props} />
            {(!!description || (!!error && touched)) && (
                <p className={`text-sm ${error ? 'text-red-500' : 'text-slate-500'}`}>
                    {error ?? description}
                </p>
            )}
        </div>
    )
}
