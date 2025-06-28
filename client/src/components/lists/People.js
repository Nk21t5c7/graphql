import React from "react";
import { List } from 'antd'
import PersonCard from "../listItems/PersonCard";
import { GET_PEOPLE_AND_CAR } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const People = () => {

    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PEOPLE_AND_CAR)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`;

  return <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
  {data.people.map(({ id, firstName, lastName, car }) => (
      <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName} car={car} />
      </List.Item>
  ))}

</List>
};

export default People;

const getStyles = () => ({
    list: {
        // display: 'flex',
        justifyContent: 'center'
    }
})