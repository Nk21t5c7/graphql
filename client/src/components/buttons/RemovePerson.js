import { DeleteOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import filter from 'lodash'
import { GET_PEOPLE, REMOVE_PERSON } from '../../graphql/queries';

const RemovePerson = ({ id }) => {
    const [removePerson] = useMutation(REMOVE_PERSON, {
        // removePersonはmutationのところの関数名と統一
        update(cache, { data: { removePerson } }) {
            // ここは下のfilterのところと同じにする
            const { people } = cache.readQuery({ query: GET_PEOPLE })

            cache.writeQuery({
                // query: 書き込みたいデータに対応するGraphQLクエリ
                query: GET_PEOPLE,
                // data: 実際にキャッシュに書き込むデータ（クエリの戻り値と同じ）
                data: {
                    // filter(配列, callback)
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