import Reflux from 'reflux';

const VariableActions = Reflux.createActions([
  'getVariables'
]);

class VariableStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      variables: 'some piece of shit',
      baseUrl: "http://52.221.40.15:9080/"
      // baseUrl: "http://localhost:9080/"
    };
    this.listenables = VariableActions;
  }

  onGetVariables() {
    this.setState({variables: 'some vars'});
  }
}

export default VariableStore;
