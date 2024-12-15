import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { Split, Swimmer } from './Interfaces';

interface SplitParams {
    splits: Split[] | null,
    swimmer: Swimmer | null,
    is_active: boolean,
    on_close: () => void
}

const SplitDisplay: React.FC<SplitParams> = ({ splits, swimmer, is_active, on_close }) => {
    const swimmer_name = `${swimmer?.first_name} ${swimmer?.last_name}`;
    const is_splits = splits !== null && splits.length > 0;
    const title: string = is_splits ? `${swimmer_name} Splits` : `No Splits Available for: ${swimmer_name}`;
    return (
        <Dialog open={is_active} onClose={() => on_close()}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <div>
                    {is_splits ? <h3>Splits</h3> : <span></span>}
                    <List>
                        {splits?.map(split => (
                            <ListItem key={split.order}>
                                Split {split.order}: {split.time} s
                            </ListItem>
                        ))}
                    </List>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => on_close()} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SplitDisplay;