import React from "react";
import Categories from "./Categories";
import Cocktail from "./Cocktail";
import Instructions from "./Instructions";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesLoaded: false,
            cocktailsLoaded: true,
            alcoholic: true,
            non_alcoholic: true,
        };

    }

    componentDidMount() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
            .then(res => res.json())
            .then((json) => {
                this.setState({
                    categories: json,
                    categoriesLoaded: true
                });
            })
    }

    generateCategories = () => this.state.categories.drinks.map((c, i) =>
        <Categories value={c} setCategory={this.setCategory} key={i}/>
    );

    setCategory = (category) => {
        this.setState(state => ({
            cocktailsLoaded: false,
            selected: category
        }));
    }

    /* Get all of the cocktails of the selected category.
     */
    populateCocktails() {
        if (!this.state.cocktailsLoaded) {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.state.selected}`)
                .then((res) => res.json())
                .then((json) => {
                    let temp = json;
                    temp = temp.drinks.slice(0, 5);
                    this.setState({
                        cocktails: temp,
                        cocktailsLoaded: true,
                    });
                })
            return <div><h1> Please wait. </h1></div>;
        } else {
            return this.state.cocktails.filter(c => c.strDrinkThumb).map(c =>
                <Cocktail name={c.strDrink} img={c.strDrinkThumb} id={c.idDrink} key={c.idDrink}
                          alcoholic={this.state.alcoholic} non_alcoholic={this.state.non_alcoholic}
                          setInstructions={this.setInstructions}/>);
        }
    }

    setInstructions = (instructions) => this.setState({instructions: instructions});
    checkAlc = (e) => this.setState({alcoholic: e.target.checked});
    checkNonAlc = (e) => this.setState({non_alcoholic: e.target.checked});

    render() {
        if (!this.state.categoriesLoaded)
            return <div><h1> Please wait. </h1></div>;
        else
            return (<div className="main">
                <div className="checkbox">
                    <label>
                        <input type="checkbox" onChange={this.checkAlc} checked={this.state.alcoholic} id="alc"/>
                        Alcoholic</label>
                    <label>
                        <input type="checkbox" onChange={this.checkNonAlc} checked={this.state.non_alcoholic}
                               id="non-alc"/>
                        Non-alcoholic</label>
                </div>
                <div className="sidebar">
                    <ul>{this.generateCategories()}</ul>
                </div>
                {this.state.selected && (
                    <div className="mainwindow">
                        <ul>{this.populateCocktails()}</ul>
                    </div>
                )}
                {this.state.instructions && (
                    <Instructions data={this.state.instructions}/>
                )}
            </div>);

    }
}

export default Main;