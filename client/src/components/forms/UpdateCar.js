import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR, GET_PEOPLE, UPDATE_PERSON, GET_PEOPLE_AND_CAR } from '../../graphql/queries'

const UpdateCar = props => {
    const { id, year, make, model, price, personId } = props
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const [updateCar] = useMutation(UPDATE_CAR)
    const [updatePerson] = useMutation(UPDATE_PERSON)

    useEffect(() => {
        forceUpdate({})
    }, [])

    // const { loading, error, data } = useQuery(GET_PEOPLE_AND_CAR)
    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`;
    console.log('data update car', props);


    const onFinish = values => {
        const { year, make, model, price, personId } = values

        updateCar({
            variables: {
                id,
                year: Number(year),
                make,
                model,
                price: Number(price),
                personId
            },
            refetchQueries: [{ query: GET_PEOPLE_AND_CAR }]
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
                <Input placeholder='i.e. 1980' />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please enter make' }]}
            >
                <Input placeholder='i.e. Honda' />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please enter model' }]}
            >
                <Input placeholder='i.e. Lexus' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please enter price' }]}
            >
                <Input placeholder='i.e. 234' />
            </Form.Item>
            <Form.Item
                name='personId'
                rules={[{ required: true, message: 'Please select a person' }]}
            >
                <Select
                    placeholder='Select a person'
                >
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
                            (
                                !form.isFieldTouched('year') && !form.isFieldTouched('model') && !form.isFieldTouched('make') && !form.isFieldTouched('personId') && !form.isFieldTouched('price')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form >
    )
}

export default UpdateCar;