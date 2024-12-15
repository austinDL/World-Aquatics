import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Heat, Swimmer, Split } from './Interfaces';
import { ReturnHome } from './Buttons';
import SplitDisplay from './SplitDisplay';
import './Components.css';

const HeatDisplay: React.FC = () => {
    const { state } = useLocation();
    const heat: Heat = state.heat;
    // state of splits popups
    const [active_splits, set_active_splits] = useState<Split[]>([]);
    const [active_swimmer, set_active_swimmer] = useState<Swimmer|null>(null);
    const [is_popup, set_is_popup] = useState<boolean>(false);

    const navigate = useNavigate();
    function handle_swimmer_click(swimmer:Swimmer) {
        navigate(`/swimmer/${swimmer.id}`, {
            state: { swimmer }
        });
    }
    function handle_split_click(splits:Split[], swimmer:Swimmer) {
        set_active_splits(splits.sort((a,b) => a.order - b.order));
        set_active_swimmer(swimmer);
        set_is_popup(true);
    }
    function deactivate() {
        set_is_popup(false);
    }

    // Define the Heat properties to display
    const rows: GridRowsProp = heat.results.map(result => ({
        id: result.id,
        athlete_name: `${result.swimmer.first_name} ${result.swimmer.last_name}`,
        country: result.swimmer.NAT,
        reaction_time: result.reaction_time || 'N/A',
        time: result.time || 'N/A',
        time_behind: result.time_behind ? result.time_behind : result.time ? "Winner" : "N/A", // If time behind is null, then they are the winner of the heat
        swimmer: result.swimmer,
        splits: result.splits,
        view_splits: 'View Splits'
    }))

    // Define the grid structure
    const columns: GridColDef[] = [
        {
            field: "athlete_name",
            headerName: "Athlete Name",
            renderCell: (params) => (
                <span className='clickable' onClick={() => handle_swimmer_click(params.row.swimmer)}>
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
        },
        {
            field: "view_splits",
            headerName: "",
            renderCell: (params) => (
                <span className='clickable inline-button' onClick={() => handle_split_click(params.row.splits, params.row.swimmer)}>
                    {params.value}
                </span>
            )
        }
    ]

    return (
        <div>
            <ReturnHome />
            <h1>{heat.name}</h1>
            <DataGrid 
                pagination
                rows={rows} 
                columns={columns}
            />
            <SplitDisplay splits={active_splits} swimmer={active_swimmer} is_active={is_popup} on_close={deactivate}/>
        </div>
    );
}

export default HeatDisplay;