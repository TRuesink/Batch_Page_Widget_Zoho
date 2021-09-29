import React from "react";
import { connect } from "react-redux";

class BatchHeader extends React.Component {
  renderContent(batch) {
    return (
      <div style={{ marginTop: "25px", marginBottom: "25px" }}>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Type</th>
              <th>End Use</th>
              <th>Stage</th>
              <th>Total Vials</th>
              <th>Created On</th>
              <th>Created By</th>
              <th>Modified On</th>
              <th>Modified By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="batchID">{batch.ID}</td>
              <td data-label="Type">{batch.Type}</td>
              <td data-label="End_Use">{batch.End_Use}</td>
              <td data-label="Stage">{batch.Stage}</td>
              <td data-label="Total_Vials">{batch.Total_Vials}</td>
              <td data-label="Created_On">{batch.Added_Time}</td>
              <td data-label="Created_By">{batch.Added_User}</td>
              <td data-label="Modified_On">{batch.Modified_Time}</td>
              <td data-label="Modified_By">{batch.Modified_User}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    const batch = this.props.batch;
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

export default connect(mapStateToProps)(BatchHeader);
