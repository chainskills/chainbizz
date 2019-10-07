import React, { Component } from 'react';

export default class ProjectContractData extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.drizzle.store.getState();
    const account = this.props.drizzleState.accounts[0];

    const { ChainBizz } = this.props.drizzle.contracts;
    this.dataKey = ChainBizz.methods.getProject.cacheCall(
      this.props.projectId,
      {
        from: account
      }
    );
  }

  render() {
    const account = this.props.drizzleState.accounts[0];
    // Retrieve project details only if the information is available
    let projectDetails = null;
    if (
      this.props.drizzleState.contracts.ChainBizz.getProject[this.dataKey] &&
      this.props.drizzleState.contracts.ChainBizz.getProject[this.dataKey].value
    ) {
      projectDetails = this.props.drizzleState.contracts.ChainBizz.getProject[
        this.dataKey
      ].value;
    }

    // project not yet ready or not found
    if (projectDetails === null || typeof projectDetails === 'undefined') {
      return <span>Initializing...</span>;
    }

    const id = this.props.projectId;

    console.log('Owner: ' + projectDetails._owner);
    console.log('Account: ' + this.props.drizzleState.accounts[0]);

    return (
      <div className='col s12 m4'>
        <div className='card medium blue-grey'>
          <div className='card-content white-text'>
            <span className='card-title'>{projectDetails._title}</span>
            <p>
              <span className='badge blue white-text'>
                {this.props.drizzle.web3.utils.fromWei(
                  projectDetails._price.toString(),
                  'ether'
                )}
                {' ETH'}
              </span>
            </p>
            <p>{projectDetails._description}</p>
          </div>
          <div className='card-action'>
            {projectDetails._owner === account && (
              <a href='#!'>
                <i className='material-icons'>delete</i>
              </a>
            )}
            {projectDetails._owner === account && (
              <a href='#!'>
                <i className='material-icons'>edit</i>
              </a>
            )}
            {projectDetails._owner === account && (
              <a href='#!'>
                <i className='material-icons'>publish</i>
              </a>
            )}
            <a href='#!'>
              <i className='material-icons'>more_horiz</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
