

import React from "react";
import People from "../lists/People";

const RecordContainer = () => {
    const styles = getStyles();

    return <div>
        <div style={styles.header}>
            <div style={styles.line}></div>
            <h2 style={styles.title}>
                Records
            </h2>
            <div style={styles.line}></div>
        </div>
        <People />
    </div>;
};

export default RecordContainer;


const getStyles = () => ({
    container: {
        padding: '15px',
        marginBottom: '50px',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px',
    },
    title: {
        margin: 0,
        padding: '10px',
        whiteSpace: 'nowrap',
    },
    line: {
        flexGrow: 1,
        height: '1px',
        backgroundColor: 'gray',
    }
})