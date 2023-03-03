import Cocktail from "./Cocktail";
import React from "react";

/*
 * Returns a list of clickable cocktails.
 */
class Cocktails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cocktailsLoaded: false
        }
        this.id = "cocktails";
    }

    componentDidMount() {
        this.updateCocktails(this.props.category)
        this.setState({category: this.props.category})
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.category !== nextProps.category) {
            this.setState({
                category: nextProps.category,
                cocktailsLoaded: false
            })
            this.updateCocktails(nextProps.category)
        }
    }

    updateCocktails(category) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    cocktails: json.drinks,
                    cocktailsLoaded: true
                });
            })
    }

    render() {
        if (!this.state.cocktailsLoaded)
            return <div id={this.id}><h1> Please wait. </h1></div>;

        return <div id={this.id}>
            <ul className="none">
                {this.state.cocktails.filter(c => c.strDrinkThumb).map(c =>
                    <Cocktail name={c.strDrink} img={c.strDrinkThumb} id={c.idDrink} key={c.idDrink}
                              alcoholic={this.props.alcoholic} non_alcoholic={this.props.non_alcoholic}
                              setInstructions={this.props.setInstructions}/>)}
            </ul>
        </div>
    }
}

export default Cocktails;