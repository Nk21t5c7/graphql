import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR, GET_PEOPLE } from '../../graphql/queries'

const UpdatePerson = props => {
    const { id, year, make, model, price, personId } = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [updateCar] = useMutation(UPDATE_CAR)

    useEffect(() => {
        forceUpdate({})
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`;


    const onFinish = values => {
        const { year, make, model, price, } = values

        updateCar({
            variables: {
                id, year, make, model, price, personId
            }
        })
        props.onButtonClick()
    }

    return (
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year, make, model, price, personId
            }}
        >
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please enter year' }]}
            >
                <Input placeholder='i.e. John' />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please enter make' }]}
            >
                <Input placeholder='i.e. Smith' />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please enter model' }]}
            >
                <Input placeholder='i.e. Smith' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please enter price' }]}
            >
                <Input placeholder='i.e. Smith' />
            </Form.Item>
            <Form.Item
                name='personId'
                rules={[{ required: true, message: 'Please select a person' }]}
            >
                <Select placeholder='Select a person' >
                    {data.people.map((p) => (
                        <Select.Option key={p.id} value={p.id}>
                            {p.firstName} {p.lastName}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(['year', 'make', 'model', 'price', 'personId'], true) ||
                            form.getFieldsError().some(({ errors }) => errors.length > 0)
                          }                          
                    >
                        Update Person
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson;