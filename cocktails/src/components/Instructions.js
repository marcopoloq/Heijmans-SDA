import React from "react";
import Categories from "./Categories";

/*
 * Renders the instructions and ingredients needed for the selected drink.
 */
class Instructions extends React.Component {
    constructor(props) {
        super(props);
    }

    // Return a list of all of the ingredients.
    showIngredients() {
        let res = []
        for (const [key, value] of Object.entries(this.props.data))
            if (key.includes("strIngredient") && value !== null)
                res.push(value);

        return <ul>
            {res.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
    }

    render() {
        return <div className="Instructions">
            {this.props.data.strInstructions}
            {this.showIngredients()}
        </div>
    }
}

export default Instructions;