import React from "react";
import { connect } from "react-redux";
import { getBatch, getPrinters, getLabelRenderings } from "../Actions";
import { Router, Route } from "react-router-dom";
import history from "../history";
import LabelForm from "./Label/LabelForm";
import LabelList from "./Label/LabelList";

class App extends React.Component {
  componentDidMount() {
    this.props.getBatch();
    this.props.getPrinters();
  }

  onSubmit = (formValues) => {
    const startSerialNum = parseInt(formValues.startSerialNum);
    const endSerialNum = parseInt(formValues.endSerialNum);
    this.props.getLabelRenderings(
      this.props.batch.data.ID,
      this.props.dymo.labels,
      startSerialNum,
      endSerialNum
    );
  };

  getInitialValues() {
    const batch = this.props.batch.data;
    const printer = this.props.dymo.printers;
    const recipe = batch.Recipes[0].ID;
    const endSerialNum =
      parseInt(batch.Recipes[0].display_value.split(",")[1]) - 1;
    return {
      recipe: recipe,
      printer: printer[0].name,
      startSerialNum: 0,
      endSerialNum: endSerialNum,
    };
  }
  render() {
    const batchSuccess = this.props.batch.success;
    const printerSuccess = this.props.dymo.success;
    return (
      <div style={{ padding: "50px" }}>
        <h1 className="ui dividing header">
          <i className="print icon"></i>
          <div className="content">Print Vial Labels</div>
        </h1>
        <Router history={history}>
          <div className="ui stackable grid">
            <div className="four wide column">
              {batchSuccess && printerSuccess ? (
                <LabelForm
                  initialValues={this.getInitialValues()}
                  recipes={this.props.batch.data.Recipes}
                  printers={this.props.dymo.printers}
                  onSubmit={this.onSubmit}
                />
              ) : (
                <div class="ui active centered inline loader"></div>
              )}
            </div>
            <div className="twelve wide column">
              <div>
                <LabelList />
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { batch: state.batch, dymo: state.dymo };
};

export default connect(mapStateToProps, {
  getBatch,
  getPrinters,
  getLabelRenderings,
})(App);
