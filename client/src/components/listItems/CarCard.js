import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdateCar from '../forms/UpdateCar'
import RemoveCar from '../buttons/RemoveCar'

const CarCard = props => {
  const { id, year, make, model, price, personId } = props
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateCar id={id} year={year} make={make} model={model} price={price} personId={personId} onButtonClick={handleButtonClick} />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
        >
          {`${year} ${make} ${model} -> ${price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
        </Card>
      )}
    </div>
  )
}

export default CarCard;

const getStyles = () => ({
  card: {
    // width: '500px'
  }
})