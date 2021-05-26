import React from 'react';
import MDSpinner from "react-md-spinner";


export default function Loading() {

    const Spinner = () => {
        return <MDSpinner singleColor="#177a00" size="50" />;
      };

    return (
        <Spinner />
    )
}