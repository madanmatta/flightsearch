import React from 'react';
// import * as cities from '../../data/cities.json';


export default class SelectList extends React.Component {
    MakeItem = (i, index) => {
        return <option key={index} value={i.value}>{i.name}</option>;
    };
    render() {
        return (
            <select className="form-control col-md-6"
                onChange={this.onSelectChange}>
                {this.props.list.map((item, index) => this.MakeItem(item, index))}
            </select>
        );
    }

    onSelectChange = (event) => {
        this.props.onSelectListChange(event.target.value);
    }
}