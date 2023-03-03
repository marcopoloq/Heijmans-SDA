import React from "react";
import Categories from "./Categories";
import Instructions from "./Instructions";
import Cocktails from "./Cocktails";

import "../index.css"

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoriesLoaded: false,
            alcoholic: true,
            non_alcoholic: true,
        };
        this.id = "main";
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

    /*
     * Functions in charge of changing the state of the website.
     */
    // Update the state of the category.
    setCategory = (category) => this.setState({category: category});

    // Update the state of the instructions.
    setInstructions = (instructions) => this.setState({instructions: instructions});
    // Update the state of the Alcoholic and Non-alcoholic checkboxes.
    checkAlc = (e) => this.setState({alcoholic: e.target.checked});
    checkNonAlc = (e) => this.setState({non_alcoholic: e.target.checked});

    /*
     * Rendering the website.
     */
    render() {
        if (!this.state.categoriesLoaded)
            return <div className={this.id}><h1> Please wait. </h1></div>;

        return (<div id={this.id}>
            <div id="sidebar">
                <div className="checkbox">
                    <label>
                        <input type="checkbox" onChange={this.checkAlc} checked={this.state.alcoholic} id="alc"/>
                        Alcoholic</label>
                    <label>
                        <input type="checkbox" onChange={this.checkNonAlc} checked={this.state.non_alcoholic}
                               id="non-alc"/>
                        Non-alcoholic</label>
                </div>
                <Categories categories={this.state.categories} setCategory={this.setCategory}/>
            </div>
            { // Only load the cocktails if a category has been selected.
                this.state.category && <Cocktails category={this.state.category}
                                                  alcoholic={this.state.alcoholic}
                                                  non_alcoholic={this.state.non_alcoholic}
                                                  setInstructions={this.setInstructions}/>
            }
            { // Only load the instructions if a category has been selected.
                this.state.instructions && <Instructions data={this.state.instructions}/>
            }
        </div>);
    }
}

export default Main;