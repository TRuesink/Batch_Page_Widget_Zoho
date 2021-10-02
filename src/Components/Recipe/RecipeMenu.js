import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class RecipeMenu extends React.Component {
  renderRecipes() {
    const recipes = this.props.batch.data.Recipes;
    return recipes.map((rec) => {
      const title = rec.display_value.split(",")[0];
      const numVials = rec.display_value.split(",")[1];
      return (
        <NavLink to={`/recipe/${rec.ID}`} className="item">
          {title}
          <div className="ui left pointing label">{numVials} Vials</div>
        </NavLink>
      );
    });
  }
  render() {
    if (this.props.batch.success) {
      return (
        <div className="ui fluid vertical menu">{this.renderRecipes()}</div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    batch: state.batch,
  };
};

export default connect(mapStateToProps)(RecipeMenu);
