import React, { useState } from 'react'
import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { Field } from '@/components/field'
import { Form, Formik } from 'formik'
import { toFormikValidationSchema as formikify } from 'zod-formik-adapter';
import { z } from 'zod';
import { encode } from '@/lib/matrix'
import { useNavigate } from 'react-router-dom'


const schema = z.object({
    message: z.string().regex(/^[\w.\s,\'"]+$/, `Message can only contain a-Z 0-9 . , _ ' "`)
})

export const EncodeMatrix = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Modal isOpen={isOpen} openModal={openModal} closeModal={closeModal} title="Encode a message">
                
                <Formik initialValues={{ message: '' }} onSubmit={(v, {setSubmitting}) => {
                    const encoded = encode(v.message);
                    closeModal()
                    setSubmitting(false)
                    navigate(`/show?data=${encodeURIComponent(JSON.stringify(encoded))}`)
                }} validationSchema={formikify(schema)}>
                    {() => (
                        <Form>
                            <div className='py-2'>
                                <Field label='Message to be encoded' name='message' />
                                <div className='mt-3'>
                                    <Button type="submit" variant={'outline'}>Submit</Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
            <Button onClick={openModal}>Encode</Button>
        </>
    )
}
