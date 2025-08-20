import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { REMOVE_CAR, GET_PEOPLE_AND_CAR } from '../../graphql/queries';

const RemoveCar = ({ id }) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(cache, { data: { removeCar } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE_AND_CAR });
            const updatedPeople = people.map(person => ({
                ...person,
                car: person.car.filter(c => c.id !== removeCar.id)
            }));
            cache.writeQuery({
                query: GET_PEOPLE_AND_CAR,
                data: { people: updatedPeople }
            });
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this car?')

        if (result) {
            removeCar({
                variables: {
                    id
                }
            })
        }
    }
    return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
};

export default RemoveCar;