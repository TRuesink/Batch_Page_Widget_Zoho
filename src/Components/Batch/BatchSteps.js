import React from "react";
import { connect } from "react-redux";

class BatchSteps extends React.Component {
  renderIngredients(ingredients) {
    return ingredients.map((ing) => {
      console.log(ing);
      return (
        <a className="step">
          <i className="flask icon"></i>
          <div className="content">
            <div className="title">{ing.display_value.split(",")[1]}</div>
          </div>
        </a>
      );
    });
  }

  renderContent(batch) {
    return (
      <div className="ui vertical steps">
        <a className=" step">
          <i className="balance scale icon"></i>
          <div className="content">
            <div className="title">Scale QC</div>
          </div>
        </a>
        {this.renderIngredients(batch.Secondary_Ingredients)}
        <a className=" step">
          <i className="tint icon"></i>
          <div className="content">
            <div className="title">Make Vials</div>
          </div>
        </a>
        <a className=" step">
          <i className="print icon"></i>
          <div className="content">
            <div className="title">Print Labels</div>
          </div>
        </a>
      </div>
    );
  }
  render() {
    const batch = this.props.batch;
    console.log(batch);
    if (batch.success) {
      return this.renderContent(batch.data);
    } else {
      return <div className="ui active centered inline loader"></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    batch: state.batch,
  };
};

export default connect(mapStateToProps)(BatchSteps);
