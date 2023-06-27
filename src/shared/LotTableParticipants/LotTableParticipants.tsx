import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IBidData } from 'redux/slices/bid';

interface ILotTableParticipants {
    bids: IBidData[];
}

interface IUsersTableData {
    id: number;
    username: string;
    price: number;
}

function createData(id: number, username: string, price: number) {
    return { id, username, price };
}

export function LotTableParticipants({ bids }: ILotTableParticipants) {
    const [rows, setRows] = React.useState<IUsersTableData[]>([]);

    React.useEffect(() => {
        const newRows = bids.map((bid) => createData(bid?.id, bid?.owner?.username, bid?.price));
        setRows(newRows);
    }, [bids]);

    return (
        <TableContainer sx={{ margin: '20px 0', border: '1px solid #eee' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Идентификатор</TableCell>
                        <TableCell>Логин</TableCell>
                        <TableCell>Ставка</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row?.id}>
                            <TableCell component="th" scope="row">
                                {row?.id}
                            </TableCell>
                            <TableCell>{row?.username}</TableCell>
                            <TableCell>{row?.price} руб.</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
