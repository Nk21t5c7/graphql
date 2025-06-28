import React from "react";
import { List } from 'antd'
import CarCard from "../listItems/CarCard";

const Cars = car => {
  console.log(car.car)

    const styles = getStyles()


  return <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
  {car.car.map(({ id, year, make, model, price }) => (
      <List.Item key={id}>
          <CarCard id={id} year={year} make={make} model={model} price={price} />
      </List.Item>
  ))}

</List>
};

export default Cars;

const getStyles = () => ({
    list: {
        // display: 'flex',
        justifyContent: 'center'
    }
})