import React from 'react';
import { useLocation } from 'react-router-dom';
import { Swimmer } from "./Interfaces";

const SwimmerDisplay: React.FC = () => {
    const { state } = useLocation();
    const swimmer: Swimmer = state.swimmer;

    return (
        <div>{swimmer.first_name} {swimmer.last_name}</div>
    )
}

export default SwimmerDisplay