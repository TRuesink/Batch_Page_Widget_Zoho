import React from "react";
import BatchHeader from "./Batch/BatchHeader";
import { connect } from "react-redux";
import { getBatch } from "../Actions";
import BatchSteps from "./Batch/BatchSteps";

class App extends React.Component {
  componentDidMount() {
    this.props.getBatch();
  }
  render() {
    return (
      <div style={{ padding: "50px" }}>
        <h1 className="ui dividing header">
          <i className="settings icon"></i>
          <div className="content">Batch Manufacturing</div>
        </h1>
        <BatchHeader />
        <div className="ui stackable grid">
          <div className="four wide column">
            <BatchSteps />
          </div>
          <div className="twelve wide column"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { getBatch })(App);
