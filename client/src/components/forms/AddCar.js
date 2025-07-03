import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select } from 'antd'
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE, GET_PEOPLE_AND_CAR } from '../../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';


const AddCar = () => {
    const [form] = Form.useForm()
    const [, forceUpdate] = useState();
    const [addCar] = useMutation(ADD_CAR)
    const [id] = useState(uuidv4())

    useEffect(() => {
        forceUpdate();
    }, [])

    const { loading, error, data } = useQuery(GET_PEOPLE)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`;

    const onFinish = values => {
        const { make, year, model, price, personId } = values
        const newid = uuidv4();

        addCar({
            variables: {
                // id,
                id: newid,
                make,
                model,
                year: Number(year),
                price: Number(price),
                personId,
                // refetchQueries: [
                //     { query: GET_PEOPLE_AND_CAR },
                //     { query: GET_CARS }
                // ]

            },

            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS });
                console.log("add car data", data)
                const currentCars = data?.cars || [];
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        cars: [...currentCars, addCar]
                    }
                });
                const peopleAndCardata = cache.readQuery({ query: GET_PEOPLE_AND_CAR });
                const updatedPeople = peopleAndCardata.people.map(person => {
                    if (person.id === addCar.personId) {
                        return {
                            ...person,
                            car: [...person.car, addCar]
                        };
                    }
                    return person;
                });
                cache.writeQuery({
                    query: GET_PEOPLE_AND_CAR,
                    data: {
                        ...peopleAndCardata,
                        people: updatedPeople
                    }
                });
            }
        })
        form.resetFields();
    }

    return (
        <Form
            form={form}
            name='add-car-form'
            layout='inline'
            size='large'
            onFinish={onFinish}
            style={{ marginBottom: '40px' }}
        >
            <Form.Item
                name='year'
                label="Year:"
                rules={[{ required: true, message: 'Please enter year' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='make'
                label="Make:"
                rules={[{ required: true, message: 'Please enter make' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='model'
                label="Model"
                rules={[{ required: true, message: 'Please enter model' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name='price'
                label="Price"
                rules={[{ required: true, message: 'Please enter price' }]}
            >
                <Input prefix="$" />
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
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>

    )
        ;
};

export default AddCar;
