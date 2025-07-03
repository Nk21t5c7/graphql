import React from "react";
import { List } from 'antd'
import CarCard from "../listItems/CarCard";
import { GET_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";


const Cars = car => {
  const styles = getStyles()
  // // const { loading, error, data } = useQuery(GET_CARS);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error! {error.message}</div>;


  return <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
    {car.car.map(({ id, year, make, model, price, personId }) => (
      <List.Item key={id}>
        <CarCard id={id} year={year} make={make} model={model} price={price} personId={personId} />
      </List.Item>
    ))}
    {/* {data.car.map(({ id, year, make, model, price, personId }) => (
      <List.Item key={id}>
        <CarCard id={id} year={year} make={make} model={model} price={price} personId={personId} />
      </List.Item>
    ))} */}

  </List>
};

export default Cars;

const getStyles = () => ({
  list: {
    // display: 'flex',
    justifyContent: 'center'
  }
})