import React from "react";
import { connect } from "react-redux";

class LabelList extends React.Component {
  renderLabels() {
    const labels = this.props.labels;
    if (labels.success) {
      return (
        <div style={{ padding: "25px" }} className="ui four doubling cards">
          {Object.values(labels.data).map((lab) => {
            return (
              <div className="card">
                <div className="content">
                  <div className="image">
                    <img className="ui small image" src={lab.png} />
                  </div>
                </div>
                <div className="ui bottom attached button">
                  <i className="print icon"></i>
                  Print Label
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    const loadingStatus = this.props.labels.pending ? "loading" : "";
    const activeStatus = this.props.labels.success ? "" : "disabled";
    return (
      <div>
        <button
          className={`ui button red fluid ${loadingStatus} ${activeStatus}`}
        >
          Print All
        </button>
        {this.renderLabels()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    labels: state.labels,
  };
};

export default connect(mapStateToProps)(LabelList);
