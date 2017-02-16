import Reflux from 'reflux';

const JobActions = Reflux.createActions([
  'getJobs'
]);

class JobStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      well: 'crap'
    };
    this.listenables = JobActions;
  }

  onGetJobs() {
    console.log('called getJobs, gonna log this')
    console.log(this);
    this.well = 'shit';
  }
}

export default JobStore;
