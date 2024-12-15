import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import { Heat, Swimmer, Split } from '../Interfaces/ComponentInterfaces';
import { ReturnHome } from '../Buttons';
import SplitDisplay from './SplitDisplay';
import '../Components.css';

const HeatDisplay: React.FC = () => {
    const { state } = useLocation();
    const heat: Heat = state.heat;
    // state of splits popups
    const [active_splits, set_active_splits] = useState<Split[]>([]);
    const [active_swimmer, set_active_swimmer] = useState<Swimmer|null>(null);
    const [is_popup, set_is_popup] = useState<boolean>(false);
    const [page, set_page] = useState(0);
    const [rows_per_page, set_rows_per_page] = useState(5);

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

    const first_result: number = page * rows_per_page;
    const last_result: number = first_result + rows_per_page;
    const results_to_display = heat.results.slice(first_result, last_result);

    return (
        <div>
            <ReturnHome />
            <h1>{heat.name}</h1>
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
                    count={heat.results.length}
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

export default HeatDisplay;