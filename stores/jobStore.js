import Reflux from 'reflux';

const JobActions = Reflux.createAction([
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

  getJobs() {
    console.log('called getJobs, gonna log this')
    console.log(this);
    this.well = 'shit';
  }
}

export default JobStore;
