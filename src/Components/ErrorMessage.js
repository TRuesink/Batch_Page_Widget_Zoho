import React from "react";

class ErrorMessage extends React.Component {
  render() {
    const display = this.props.errorMessage === null ? "hidden" : "";
    return (
      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "80px",
          top: "10%",
          left: "50%",
          marginTop: "-40px",
          marginLeft: "-250px",
        }}
        class={`ui negative floating message ${display}`}
      >
        <i onClick={() => this.props.closeFunction()} class="close icon"></i>
        <div class="header">{this.props.errorTitle}</div>
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }
}

export default ErrorMessage;
