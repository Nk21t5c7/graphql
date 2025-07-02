import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { GET_CARS, REMOVE_CAR, GET_PEOPLE_AND_CAR } from '../../graphql/queries';

const RemoveCar = ({ id }) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        // removePersonはmutationのところの関数名と統一
        update(cache, { data: { removeCar } }) {
            // ここは下のfilterのところと同じにする
            // console.log(cache.readQuery({ query: GET_CARS }))
            // const { cars } = cache.readQuery({ query: GET_CARS })
            

            // cache.writeQuery({
            //     // query: 書き込みたいデータに対応するGraphQLクエリ
            //     query: GET_CARS,
            //     // data: 実際にキャッシュに書き込むデータ（クエリの戻り値と同じ）
            //     data: {
            //         // filter(配列, callback)
            //         cars: filter(cars, p => {
            //             return p.id !== removeCar.id
            //         })
            //     }
            // })
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