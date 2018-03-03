import Ember from 'ember';
import Resolver from 'ember-resolver';

const { get } = Ember;

export default Resolver.extend({
  resolveReactComponent(parsedName) {
    parsedName.type = 'component';
    const result = this.resolveOther(parsedName);
    parsedName.type = 'preact-component';
    return result;
  }
});
