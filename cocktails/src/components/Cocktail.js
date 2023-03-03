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
                this.setState(json.drinks[0]);
            });
    }

    showIngredients = (e) => {
        this.props.setInstructions(this.state);
    }

    render() {
        if (this.state.loaded &&
            ((this.props.alcoholic && this.state.strAlcoholic === "Alcoholic") || (this.props.non_alcoholic && this.state.strAlcoholic === "Non alcoholic")))
            return <div id="cocktail">
                <li onClick={this.showIngredients}>
                    <label className="cocktailname">{this.props.name}</label>
                    <img src={this.props.img} alt={this.props.name}/></li>
            </div>;
        return <></>;
    }
}

export default Cocktail;