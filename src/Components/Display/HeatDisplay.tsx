import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Tab, Tabs } from '@mui/material';
import { Heat, Swimmer, Split, Result } from '../Interfaces/ComponentInterfaces';
import { ReturnHome } from '../Buttons';
import SplitDisplay from './SplitDisplay';
import '../Components.css';

interface ResultParams {
    active_heat: Heat
}

const ResultDisplay: React.FC<ResultParams> = ({ active_heat }) => {
    // state of splits popups
    const [active_splits, set_active_splits] = useState<Split[]>([]);
    const [active_swimmer, set_active_swimmer] = useState<Swimmer|null>(null);
    const [is_popup, set_is_popup] = useState<boolean>(false);
    // state of pagination
    const [page, set_page] = useState(0);
    const [rows_per_page, set_rows_per_page] = useState(5);
    const first_result: number = page * rows_per_page;
    const last_result: number = first_result + rows_per_page;
    const results_to_display: Result[] = active_heat.results.slice(first_result, last_result);

    // Helper functions
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
    
    return (
        <div>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead className='table-header'>
                            <TableRow>
                                <TableCell sx={{color: 'white'}}>Athlete Name</TableCell>
                                <TableCell sx={{color: 'white'}}>Country</TableCell>
                                <TableCell sx={{color: 'white'}}>Reaction Time (s)</TableCell>
                                <TableCell sx={{color: 'white'}}>Time (s)</TableCell>
                                <TableCell sx={{color: 'white'}}>Time Behind (s)</TableCell>
                                <TableCell sx={{color: 'white'}}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results_to_display.map(result => (
                                <TableRow key={result.id}>
                                    <TableCell className='clickable' onClick={() => handle_swimmer_click(result.swimmer)}>
                                        {result.swimmer.first_name} {result.swimmer.last_name}
                                    </TableCell>
                                    <TableCell>{result.swimmer.NAT}</TableCell>
                                    <TableCell>{result.reaction_time || 'N/A'}</TableCell>
                                    <TableCell>{result.time || 'N/A'}</TableCell>
                                    <TableCell>{result.time_behind ? result.time_behind : result.time ? "Winner" : "N/A"}</TableCell>
                                    <TableCell className='clickable inline-button' onClick={() => handle_split_click(result.splits, result.swimmer)}>
                                        View Splits
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={active_heat.results.length}
                    rowsPerPage={rows_per_page}
                    page={page}
                    onPageChange={(_, page) => set_page(page)}
                    onRowsPerPageChange={(event) => set_rows_per_page(parseInt(event.target.value, 10)) }
                />
            </Paper>
            <SplitDisplay 
                splits={active_splits} 
                swimmer={active_swimmer} 
                is_active={is_popup} 
                on_close={deactivate}
            />
        </div>
    );
}

const HeatDisplay: React.FC = () => {
    const { state } = useLocation();
    const heat: Heat = state.heat;
    const all_heats: Heat[] = state.all_heats;
    
    // state of heat navigation
    const [active_heat_idx, set_active_heat_idx] = useState(all_heats.indexOf(heat));
    const active_heat = all_heats[active_heat_idx];
    return (
        <div>
            <ReturnHome />
            <h1>{active_heat.name}</h1>
            <Tabs value={active_heat_idx} onChange={(_, next_heat_idx) => set_active_heat_idx(next_heat_idx)}>
                {
                    all_heats.map((heat, index) => <Tab key={index} label={heat.name} value={index}/>)
                }
            </Tabs>
            <ResultDisplay active_heat={active_heat} />
        </div>
    );
}

export default HeatDisplay;