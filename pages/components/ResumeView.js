import React, { Component } from 'react';

class ResumeView extends Component{
  constructor(props){
    super(props);
    this.props = props;
  }

  render(){
    return (
      <div className="resume">
        <h3>IT Support Specialist</h3><br/>
        <h4>Watkins Insurance Group - Austin, TX</h4>
        <h4>July 2018 to Present</h4>
        <ul>
          <li>Built, installed, and maintained PCs, telephone systems, wireless APS, network and peripheral devices.</li>
          <li>Maintained active directory, email accounts, carrier and client databases, Barracuda email filter, and virtualization environment.</li>
          <li>Developed and documented new company standards, procedures, and conventions.</li>
        </ul>
        <hr/>

        <h3>Tech Support Escalations Specialist</h3><br/>
        <h4>Suddenlink Communications (Altice USA) - Lubbock, TX</h4>
        <h4>January 2014 to June 2018</h4>
        <ul>
          <li>Assisted customers in troubleshooting equipment problems, owning the issue until resolution while maintaining customer satisfaction standards.</li>
          <li>Managed customer accounts and maintained diligent notes on all interactions.</li>
          <li>Employed conflict-resolution techniques to de-escalate customers experiencing uncommonly difficult service issues, effectively redirecting the conversation toward issue-resolution and customer satisfaction.</li>
        </ul>
        <hr/>

        <h3>IT Support Specialist</h3><br/>
        <h4>Managed Care Services - Lubbock, TX</h4>
        <h4>March 2016 to August 2017</h4>
        <ul>
          <li>Performed various technical upgrades throughout the organization.</li>
          <li>Implemented several much-needed system hardening techniques to ensure HIPAA compliance and patient confidentiality.</li>
          <li>General IT support.</li>
        </ul>
      </div>
    )
  }
}

export default ResumeView;
