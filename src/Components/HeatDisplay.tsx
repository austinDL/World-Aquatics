import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Heat, Swimmer } from './Interfaces';

const HeatDisplay: React.FC = () => {
    const { state } = useLocation();
    const heat: Heat = state.heat;

    const navigate = useNavigate();
    function handle_swimmer_click(swimmer:Swimmer) {
        navigate(`/swimmer/${swimmer.id}`, {
            state: { swimmer }
        });
    }

    // Define the Heat properties to display
    const rows: GridRowsProp = heat.results.map(result => ({
        id: result.id,
        athlete_name: `${result.swimmer.first_name} ${result.swimmer.last_name}`,
        country: result.NAT,
        reaction_time: result.reaction_time,
        time: result.time,
        time_behind: result.time_behind || "Winner", // If time behind is null, then they are the winner of the heat
        swimmer: result.swimmer
    }))

    // Define the grid structure
    const columns: GridColDef[] = [
        {
            field: "athlete_name",
            headerName: "Athlete Name",
            renderCell: (params) => (
                <span onClick={() => handle_swimmer_click(params.row.swimmer)}>
                    {params.value}
                </span>
            )
        },
        {
            field: "country",
            headerName: "Country"
        },
        {
            field: "reaction_time",
            headerName: "Reaction Time (s)"
        },
        {
            field: "time",
            headerName: "Time (s)"
        },
        {
            field: "time_behind",
            headerName: "Time Behind (s)"
        }
    ]

    return (
        <div>
            <h1>{heat.name}</h1>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}

export default HeatDisplay;