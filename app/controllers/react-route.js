import Ember from 'ember';

export default Ember.Controller.extend({

  userInput: '',
  reactInput: '',

  actions: {
    textChanged (event) {
      this.set('userInput', event.target.value);
    },

    reactValueChanged(val) {
      this.set('reactInput', val);
    }
  }
});
