import React from 'react';
import { useLocation } from 'react-router-dom';
import { Swimmer } from "./Interfaces";

const SwimmerDisplay: React.FC = () => {
    const { state } = useLocation();
    const swimmer: Swimmer = state.swimmer;
    const full_name: string = `${swimmer.first_name} ${swimmer.last_name}`;

    return (
        <div>
            <h1>{full_name}</h1>
            <p>At {swimmer.age} years old, {full_name} has been competing as a swimmer for their home country of {swimmer.NAT}</p>
        </div>
    )
}

export default SwimmerDisplay