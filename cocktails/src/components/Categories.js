import React from "react";

/*
 * Returns a list of clickable category items.
 */
class Categories extends React.Component {
    onClick = (category) => ((e) => {
        this.props.setCategory(category);
        e.preventDefault();
    })


    render() {
        return <div id="categories">
            <ul>
                {this.props.categories.drinks.map((c, i) =>
                    <li onClick={this.onClick(c.strCategory)} key={i}>
                        <label className="categoryitem">{c.strCategory}</label>
                    </li>)}
            </ul>
        </div>
    }
}

export default Categories;