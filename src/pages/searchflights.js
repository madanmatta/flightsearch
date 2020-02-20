import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import SelectList from '../components/common/selectlist';
import TravelDatePicker from '../components/common/traveldatepicker';
import { connect } from 'react-redux';
import { getSchedules, getCities } from '../actions/actions';
import { compose } from 'redux';


export class SearchFlights extends Component {
    componentWillMount() {
        this.props.getCities();
    }

    state = {
        travelDate: new Date(),
        returnDate: '',
        sourceValue: '',
        destinationValue: '',
        isSourceValid: false,
        isDestinationValid: false,
        isTravelDateValid: true,
    };

    searchFlights = () => {
        if (this.isSearchEnabled()) {
            const source = this.props.citiesList.filter(item =>
                item.value === this.state.sourceValue);
            const dest = this.props.citiesList.filter(item =>
                item.value === this.state.destinationValue);
            const obj = { source: source[0].name, destination: dest[0].name };
            this.props.getSchedules(obj);
            this.props.history.push('/flights');
        }
    }

    isSearchEnabled() {
        return ((this.state.isDestinationValid &&
            this.state.isSourceValid && this.state.isTravelDateValid)
            && (this.state.sourceValue !== this.state.destinationValue));
    }

    onSelectionChange = (value, name) => {
        switch (name) {
            case 'sourcecity':
                if (value !== '0') {
                    return this.setState({ isSourceValid: true, sourceValue: value });
                }
                return this.setState({ isSourceValid: false });
            case 'destinationcity':
                if (value !== '0') {
                    return this.setState({ isDestinationValid: true, destinationValue: value });
                }
                return this.setState({ isDestinationValid: false });
            case 'travelDate':
                if (value === null) {
                    return this.setState({ isTravelDateValid: false });
                }
                return this.setState({ isTravelDateValid: true, travelDate: value });
            case 'returnDate':
                return this.setState({ returnDate: value });
            default:
                break;
        }
    }

    validate = () => {
        return (this.state.isDestinationValid && this.state.isSourceValid) &&
            (this.state.sourceValue === this.state.destinationValue);
    }

    render() {
        return (
            <div className="row" style={{ marginTop: 25 }}>
                <div className="col-md-4"></div>
                <div className="col-md-6">
                    <div style={{ marginTop: 10 }}>
                        <SelectList list={this.props.citiesList}
                            onSelectListChange={(selected) => this.onSelectionChange(selected, 'sourcecity')}></SelectList>
                    </div>
                    {this.state.isSourceValid ? null : <label htmlFor="usr" style={{ marginRight: 5, color: 'red' }}>Source City Required</label>}

                    <div style={{ marginTop: 10 }}>
                        <SelectList list={this.props.citiesList}
                            onSelectListChange={(selected) => this.onSelectionChange(selected, 'destinationcity')}></SelectList>
                    </div>
                    {this.state.isDestinationValid ? null : <label htmlFor="usr" style={{ marginRight: 5, color: 'red' }}>Destination City Required</label>}
                    <div style={{ marginTop: 10 }}>
                        <label htmlFor="usr" style={{ marginRight: 5 }}>Travel Date*</label>
                        <TravelDatePicker selectedDate={new Date()}
                            handleDateChange={(date) => this.onSelectionChange(date, 'travelDate')} />
                    </div>
                    {this.state.isTravelDateValid ? null : <label htmlFor="usr" style={{ marginRight: 5, color: 'red' }}>Travel Date Required</label>}
                    <div style={{ marginTop: 10 }}>
                        <label htmlFor="usr" style={{ marginRight: 5 }}>Return Date</label>
                        <TravelDatePicker selectedDate={''}
                            handleDateChange={(date) => this.onSelectionChange(date, 'returnDate')} />
                    </div>
                    <input type="button"
                        style={{ marginTop: 10, marginLeft: '10%' }} value="Search Flights"
                        className="btn btn-primary"
                        onClick={this.searchFlights} />
                    <br />
                    {this.validate() ? <label htmlFor="usr" style={{ marginRight: 5, color: 'red' }}>Source & Destinations should not be same</label> : null}
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        citiesList: state.citites
    }
};

const mapDispatchToProps = dispatch => ({
    getSchedules: (payload) => dispatch(getSchedules(payload)),
    getCities: () => dispatch(getCities())
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(SearchFlights);