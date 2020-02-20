import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { getSchedules } from '../actions/actions.js';
import { Link } from 'react-router-dom';

const columns = [
    { id: 'FlightNumber', label: 'Flight Number', minWidth: 170 },
    { id: 'AirlineName', label: 'Airline', minWidth: 100 },
    { id: 'Departure', label: 'Departure Time', minWidth: 100 },
    { id: 'Arrival', label: 'Arrival Time', minWidth: 100 },
    { id: 'Duration', label: 'Duration', minWidth: 100 },
    { id: 'Stops', label: 'No. Of Stops', minWidth: 100 },
    { id: 'Price', label: 'Price', minWidth: 100 },
];

export class FlightDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 4
        };
    }
    render() {
        return (
            <Paper style={{
                width: '100%',
                padding: 40,
            }}>
                <TableContainer style={{ maxHeight: 440, }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.schedules.slice(this.state.page * this.state.rowsPerPage,
                                this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map(column => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[4]}
                    component="div"
                    count={this.props.schedules.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                />
                <Link to="/">Modify Search</Link>
            </Paper>
        );
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

}

const mapStateToProps = state => {
    return {
        schedules: state.flightSchedules
    }
}

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch((getSchedules()))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetails);