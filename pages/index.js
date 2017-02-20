import React from 'react'
import Router from 'next/router'
import Reflux from 'reflux';

import JobStore from '../stores/jobStore';
import VariableStore from '../stores/variableStore';

import Modal from '../components/modal'

export default class extends Reflux.Component {
  static getInitialProps() {
    return {
      photos: new Array(15).fill(0).map((v, k) => k + 1)
    }
  }

  constructor(props) {
    super(props)
    console.log(JobStore);
    this.state = {};
    this.stores = [JobStore, VariableStore];
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  // handling escape close
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown(e) {
    if (!this.props.url.query.photoId) return
    if (e.keyCode === 27) {
      this.props.url.back()
    }
  }

  dismissModal() {
    Router.push('/')
  }

  showPhoto(e, id) {
    e.preventDefault()
    Router.push(`/?photoId=${id}`, `/photo?id=${id}`)
  }

  handleSelect(eventKey) {
    this.setState(eventKey);
  }

  goToPage(val, jobsTabViewType) {
    const obj = {};
    obj.currentTab = val;
    if (jobsTabViewType) obj.jobsTabViewType = jobsTabViewType;
    this.setState(obj);
  }

  render() {
    const { url, photos } = this.props
    // console.log("inside index.js rendering, will log this.state");
    // console.log(this.state);
    return (
      <div className='list'>
        {
          url.query.photoId &&
            <Modal
              id={url.query.photoId}
              onDismiss={() => this.dismissModal()}
            />
        }
        {
          photos.map((id) => (
            <div key={id} className='photo'>
              <a
                className='photoLink'
                href={`/photo?id=${id}`}
                onClick={(e) => this.showPhoto(e, id)}
              >
                {id}
              </a>
            </div>
          ))
        }
        <style jsx>{`
          .list {
            padding: 50px;
            text-align: center;
          }

          .photo {
            display: inline-block;
          }

          .photoLink {
            color: #333;
            verticalAlign: middle;
            cursor: pointer;
            background: #eee;
            display: inline-block;
            width: 250px;
            height: 250px;
            line-height: 250px;
            margin: 10px;
            border: 2px solid transparent;
          }

          .photoLink:hover {
            borderColor: blue;
          }
        `}</style>
      </div>
    )
  }
  
  render() {
    let content;
    switch (this.state.currentTab) {
      case 2: content =
        (<Jobs
          viewType={this.state.jobsTabViewType}
        />);
        break;
      case 3:
        content = <Projects />;
        break;
      case 1: default:
        content =
          (<Home
            goToPage={(val, jobType) => { this.goToPage(val, jobType); }}
          />);
        break;
    }
    return (
      <div>
        <Navbar fluid onSelect={(eventKey) => this.handleSelect(eventKey)} inverse collapseOnSelect fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a onClick={() => { this.handleSelect({currentTab: 1}); }}>
                <img src="./resources/logo-landscape.png" alt="HJobs"/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={{currentTab: 1}} href="#">Home</NavItem>
              <NavDropdown title="Jobs" id="nav-dropdown">
                <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'casual'}}>Quick Job</MenuItem>
                <MenuItem eventKey={{currentTab: 2, jobsTabViewType: 'stable'}}>Stable Job</MenuItem>
              </NavDropdown>
              <NavItem eventKey={{currentTab: 3}} href="#">Projects</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}
