import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { clearLabelRenderings, getVials } from "../../Actions";

class LabelForm extends React.Component {
  componentDidMount() {
    this.props.getVials(this.props.recipes[0].ID);
  }
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  };

  handleRecipeChange = (val) => {
    const currentRecipe = this.props.recipes.filter((rec) => {
      return rec.ID === val.toString();
    })[0];
    this.props.getVials(val);
    const endSerialNum =
      parseInt(currentRecipe.display_value.split(",")[1]) - 1;
    this.props.change("endSerialNum", endSerialNum);
    this.props.change("startSerialNum", 0);
    this.props.clearLabelRenderings();
  };

  renderRecipeDropdown({ input, meta, label, options, handleChange }) {
    return (
      <div class="field">
        <label>{label}</label>
        <select
          value={input.value}
          onBlur={input.onBlur}
          onDragStart={input.onDragStart}
          onDrop={input.onDrop}
          onFocus={input.onFocus}
          onChange={(e) => {
            input.onChange(e.target.value);
            handleChange(e.target.value);
          }}
        >
          {options.map((opt) => {
            const recipeData = opt.display_value.split(",");
            return (
              <option key={opt.ID} value={opt.ID}>
                {recipeData[0] + " - " + recipeData[1] + " Vials"}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  renderPrinterDropdown({ input, meta, label, options }) {
    return (
      <div class="field">
        <label>{label}</label>
        <select {...input}>
          {options.map((opt) => {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  renderDropdown({ input, meta, label, options }) {
    return (
      <div class="field">
        <label>{label}</label>
        <select {...input}>
          {options.map((opt, i) => {
            return (
              <option key={opt} value={i}>
                {opt}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  render() {
    const vials = this.props.vials.success
      ? Object.values(this.props.vials.data).map((v) => {
          return v.Vial_Serial_Number;
        })
      : ["loaindg"];
    return (
      <div className="ui segment">
        <form class="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="recipe"
            component={this.renderRecipeDropdown}
            label="Recipe"
            options={this.props.recipes}
            handleChange={this.handleRecipeChange}
          />
          <Field
            name="printer"
            component={this.renderPrinterDropdown}
            label="Printer"
            options={this.props.printers.map((p) => p.name)}
          />
          <Field
            name="startSerialNum"
            component={this.renderDropdown}
            label="Starting Serial #"
            options={vials}
          />
          <Field
            name="endSerialNum"
            component={this.renderDropdown}
            label="Ending Serial Number"
            options={vials}
          />
          <button className="ui button blue fluid">Show Labels</button>
        </form>
      </div>
    );
  }
}

LabelForm = reduxForm({
  form: "labelForm",
  enableReinitialize: true,
})(LabelForm);

const selector = formValueSelector("labelForm");

const mapStateToProps = (state) => {
  return {
    recipeID: selector(state, "recipe"),
    vials: state.vials,
  };
};

export default connect(mapStateToProps, {
  clearLabelRenderings,
  getVials,
})(LabelForm);
