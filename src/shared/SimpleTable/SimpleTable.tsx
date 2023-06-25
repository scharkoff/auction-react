import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './SimpleTable.module.scss';
import { ILotsTableData } from 'shared/UserLots/UserLots';
import { Link } from 'react-router-dom';

interface ISimpleTable {
    rows: ILotsTableData[];
    type: string;
}

export function SimpleTable({ rows, type }: ISimpleTable) {
    return (
        <TableContainer sx={{ margin: '20px 0', border: '1px solid #eee' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Идентификатор</TableCell>
                        <TableCell>Название</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row?.id}>
                            <TableCell component="th" scope="row">
                                {row?.id}
                            </TableCell>
                            <TableCell>
                                <Link to={`/${type}/${row?.id}`}>
                                    <span className={styles.link}>{row?.title}</span>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
