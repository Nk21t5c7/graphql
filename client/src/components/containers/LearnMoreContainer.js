import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON } from "../../graphql/queries";
import { Link } from "react-router-dom";

const LearnMoreContainer = () => {
    const styles = getStyles();
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { id },
    });
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`;
    console.log(data);

    return <div style={styles.list}>
        <h2>{data.person.firstName} {data.person.lastName}</h2>
        {data && data.person.car.map(car => {
            return <div>
                <ul >
                    <li>Make: {car.make}</li>
                    <li>Model: {car.model}</li>
                    <li>Year: {car.year}</li>
                    <li>Price: {car.price.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</li>
                </ul>
            </div>
        })}
        <Link to={`/`} >GO BACK HOME</Link>

    </div>;
};

export default LearnMoreContainer;

const getStyles = () => ({
    list: {
        textAlign: 'left',
    }
})
