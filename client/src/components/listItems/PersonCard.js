import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'
import Cars from '../lists/Cars'
import { Link } from 'react-router-dom'

const PersonCard = props => {
  const { id, firstName, lastName, car } = props
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson id={id} firstName={firstName} lastName={lastName} car={car} onButtonClick={handleButtonClick} />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemovePerson id={id} />
          ]}
        >
          {firstName} {lastName}
          <Cars car={car} />
          <Link to={`/people/${id}`} >Learn More</Link>
        </Card>
      )}
    </div>
  )
}

export default PersonCard;

const getStyles = () => ({
  card: {
    // width: '500px'
  }
})