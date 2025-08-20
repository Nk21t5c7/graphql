import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import filter from 'lodash'
import { GET_PEOPLE, REMOVE_PERSON } from '../../graphql/queries';

const RemovePerson = ({ id }) => {
    const [removePerson] = useMutation(REMOVE_PERSON, {
        update(cache, { data: { removePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE })

            cache.writeQuery({
             
                query: GET_PEOPLE,
                // data: data to write into the cache (same as return value of query)
                data: {
                    people: filter(people, p => {
                        return p.id !== removePerson.id
                    })
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this person?')

        if (result) {
            removePerson({
                variables: {
                    id
                }
            })
        }
    }
    return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
};

export default RemovePerson;