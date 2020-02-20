import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class TravelDatePicker extends Component {
    state = {
        selectedDate: this.props.selectedDate,
    };
    handleDateChange = date => {
        this.setState({ selectedDate: date });
        this.props.handleDateChange(date);
    }
    render() {
        return (
            <DatePicker
                selected={this.state.selectedDate}
                onChange={this.handleDateChange}
                className={'form-control'}
                minDate={new Date()} />
        );
    }
}