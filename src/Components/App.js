import React from "react";
import { connect } from "react-redux";
import {
  getBatch,
  getPrinters,
  getLabelRenderings,
  clearBatchError,
  clearDymoError,
  clearLabelRenderingsError,
  clearVialsError,
} from "../Actions";
import { Router } from "react-router-dom";
import history from "../history";
import LabelForm from "./Label/LabelForm";
import LabelList from "./Label/LabelList";
import ErrorMessage from "./ErrorMessage";

class App extends React.Component {
  componentDidMount() {
    this.props.getBatch();
    this.props.getPrinters();
  }

  onSubmit = (formValues) => {
    const startSerialNum = parseInt(formValues.startSerialNum);
    const endSerialNum = parseInt(formValues.endSerialNum);
    this.props.getLabelRenderings(
      this.props.vials.map((v) => v.Vial_Serial_Number),
      startSerialNum,
      endSerialNum
    );
  };

  getInitialValues() {
    const batch = this.props.batch.data;
    const printer = this.props.dymo.printers;
    const recipe = batch.Recipes[0];
    const endSerialNum = recipe.display_value.split(",")[1] - 1;
    return {
      recipe: recipe.ID,
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
        <ErrorMessage
          errorTitle="Error Rendering Labels"
          errorMessage={this.props.labels.error}
          closeFunction={this.props.clearLabelRenderingsError}
        />
        <ErrorMessage
          errorTitle="Error Fetching Vials"
          errorMessage={this.props.vialsError}
          closeFunction={this.props.clearVialsError}
        />
        <ErrorMessage
          errorTitle="Error Fetching Batch"
          errorMessage={this.props.batch.error}
          closeFunction={this.props.clearBatchError}
        />
        <ErrorMessage
          errorTitle="Error Fetching Printers"
          errorMessage={this.props.dymo.error}
          closeFunction={this.props.clearDymoError}
        />
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
  return {
    batch: state.batch,
    dymo: state.dymo,
    vialsError: state.vials.error,
    vials: Object.values(state.vials.data),
    labels: state.labels,
  };
};

export default connect(mapStateToProps, {
  getBatch,
  getPrinters,
  getLabelRenderings,
  clearVialsError,
  clearLabelRenderingsError,
  clearBatchError,
  clearDymoError,
})(App);
