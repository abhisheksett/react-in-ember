import Ember from 'ember';
import React from 'npm:react';
import ReactDOM from 'npm:react-dom';

import lookupFactory from 'ember-react/lib/lookup-factory';


const { get } = Ember;

const ReactComponent = Ember.Component.extend({
  /**
    The React component that this Ember component should wrap.
    @property reactComponent
    @type React.Component | Function | String
    @default null
   */
  reactComponent: Ember.computed.reads('_reactComponent'),

  didRender: function() {
    this.renderReactComponent();
  },

  didReceiveAttrs(attrs){
    this._super(...arguments);
  },

  renderReactComponent() {
    const componentClassOrName = get(this, 'reactComponent');
    let componentClass;

    if (Ember.typeOf(componentClassOrName) === 'string') {
      componentClass = lookupFactory(this, `react-component:${componentClassOrName}`);
    } else {
      componentClass = componentClassOrName;
    }

    if (!componentClass) {
      throw new Error(`Could not find react component : ${componentClassOrName}`);
    }

    let props = {};
    let attrs = this.get("attrs");
    if(attrs) {
      Object.keys(attrs).forEach(( key ) => {
        props[key] = attrs[key].value || attrs[key];
      });
    }


    var component = ReactDOM.render(React.createElement(
      componentClass,
      props
    ), get(this, 'element'));
    if(Object.keys(props).includes("child")){
      this.set("child", component._child);
    }
  },

  willDestroyElement: function() {
    ReactDOM.unmountComponentAtNode(get(this, 'element'));
  }
});

ReactComponent.reopenClass({
  // Some versions of Ember override positional param value to undefined when
  // a subclass is created using `Ember.extend({ reactComponent: foo })` so
  // instead store this value in a separate property.
  positionalParams: ['_reactComponent']
});

export default ReactComponent;
