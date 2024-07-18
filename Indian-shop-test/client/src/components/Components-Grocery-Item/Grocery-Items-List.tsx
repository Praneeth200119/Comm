import React, { useState, useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Typography, Grid, Container } from "@material-ui/core";
import { Divider, Link } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const columns = [
    { id: 'image', label: 'Image' },
    { id: 'productId', label: 'Product Id' },
    { id: 'productName', label: 'Product Name' },
    { id: 'category', label: 'Category' },
    { id: 'dateAdded', label: 'Date Added' },
    { id: 'price', label: 'Price' },
    { id: 'actions', label: 'Actions' },
];

const createData = (image: string, productId: string, productName: string, category: string, dateAdded: string, price: string, actions: string) => {
    return { image, productId, productName, category, dateAdded, price, actions };
};

const rows = [
    createData('Image1', '1', 'Product1', 'Category1', '2022-05-01', '$10.00', 'Edit / Delete'),
    createData('Image2', '2', 'Product2', 'Category2', '2022-05-02', '$20.00', 'Edit / Delete'),
    // Add more data as needed
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        input: {
            display: "block",
        },
        link: {
            color: '#FF6600',
            fontSize: 16,
            fontFamily: 'Proxima Nova',
            fontWeight: 400,
            textDecoration: 'underline',
            wordWrap: 'break-word',
            marginRight: 30
        },
        submitButton: {
            color: '#FFF',
            background: '#FF6600',
            marginLeft: 10
        },
        table: {
            minWidth: '100%',
            width: 950,
            maxHeight: 830,
            marginTop: 50,
            marginBottom: 50,
        },
        tableHeaderCell: {
            height: 60,
            background: '#F5FBF5',
            fontSize: 16,
            fontWeight: 600,
        },
        tableRow: {
            height: 76,
            fontSize: 16,
            fontWeight: 'normal',
        },
        paginationContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
        },
        container: {
            alignItems: 'center',
        },
    })
);


const GroceryItemsList: React.FC = () => {
    const classes = useStyles();
    return (
        <Container style={{ paddingTop: 20, paddingBottom: 100 }}>
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid container item xs={12}>
                    <Typography variant="h3" gutterBottom >
                        Hey Buddy!!!
                    </Typography>
                </Grid>
                <Grid container spacing={2} item xs={12} className={classes.container}>
                    <Typography variant="h6" gutterBottom>
                        Products Added 242
                    </Typography>
                    <Button className={classes.submitButton} type="submit" variant="contained">
                        + Add New Item
                    </Button>
                </Grid>

                <Grid container spacing={3} item xs={12}>
                    <div>
                        <TableContainer component={Paper} className={classes.table}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} className={classes.tableHeaderCell}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.productId} className={classes.tableRow}>
                                            <TableCell>{row.image}</TableCell>
                                            <TableCell>{row.productId}</TableCell>
                                            <TableCell>{row.productName}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.dateAdded}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.actions}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* Pagination component */}
                        <div className={classes.paginationContainer}>
                            <Pagination count={Math.ceil(rows.length / 10)} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Container >
    );
};

export default GroceryItemsList;
