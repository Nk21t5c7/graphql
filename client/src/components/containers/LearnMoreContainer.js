import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE_AND_CAR } from "../../graphql/queries";
// import 

const LearnMoreContainer = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PEOPLE_AND_CAR, {
        variables: { id },
    });
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`;

    return <div>


    </div>;
};

export default LearnMoreContainer;
