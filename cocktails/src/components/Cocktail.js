import React from "react";

class Cocktail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.props.id}`)
            .then((res) => res.json())
            .then((json) => {
                json.drinks[0].loaded = true;
                console.log(json.drinks[0])
                this.setState(json.drinks[0]);
            });
    }

    showIngredients = (e) => {
        this.props.setInstructions(this.state);
    }

    render() {
        if (this.state.loaded &&
            (this.props.alcoholic && this.state.strAlcoholic === "Alcoholic") ||
            (this.props.non_alcoholic && this.state.strAlcoholic === "Non alcoholic"))
            return <li onClick={this.showIngredients}><img src={this.props.img}/>{this.props.name}</li>;
        return <></>;
    }
}

export default Cocktail;