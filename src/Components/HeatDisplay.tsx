import React from 'react';
import { useLocation } from 'react-router-dom';
import { Heat } from './Interfaces';

const HeatDisplay: React.FC = () => {
    const { state } = useLocation();
    const heat: Heat = state.heat;

    return (
        <div>
            <h1>{heat.name}</h1>
            <ul>
                {
                    heat.results.map(result => (
                        <li key={result.id}>
                            {result.reaction_time}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default HeatDisplay;