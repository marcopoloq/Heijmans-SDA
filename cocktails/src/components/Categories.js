import React from "react";

class Categories extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.value;
    }

    onClick = (e) => {
        this.props.setCategory(this.state.strCategory);
        e.preventDefault();
    }

    render() {
        return <li onClick={this.onClick}>{this.state.strCategory}</li>;
    }
}

export default Categories;