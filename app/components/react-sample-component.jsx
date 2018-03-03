import React from 'npm:react';

class ReactSampleComponent extends React.Component {

  change(event) {
    this.props.reactValueChanged(event.target.value);
  }

  render () {
    let { val1, val2, userInput }  = this.props;
    userInput = userInput.hasOwnProperty('value') ? '' : userInput;
    return (
      <div>
        <div>This data is from React component</div><br/>
        <div>These data passed as props: {val2} </div><br/>
        <div>You have entered this in Ember Text box: <b>{userInput}</b> </div>
        <br/><br/>
        <input type="text" onChange={this.change.bind(this)} />
      </div>
    )
  }
}

export default ReactSampleComponent;
