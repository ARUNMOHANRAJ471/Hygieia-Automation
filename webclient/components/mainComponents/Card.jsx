const React = require('react');
const {hashHistory} = require('react-router');
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/properties';
import 'brace/theme/monokai';

const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      fileContent: '',
      updatedData: ''
    };
    this.modalForEditor = this.modalForEditor.bind(this);
    this.fetchFile = this.fetchFile.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.restartJavaApp = this.restartJavaApp.bind(this);
    this.updateSuccessAlert = this.updateSuccessAlert.bind(this);
  }
  modalForEditor() {
    this.setState({
      isOpen: true
    });
    console.log('ooooooooooooo: ', this.props.cardTitle);
    this.fetchFile();
  }
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };
  onChangeData(newValue) {
    console.log(newValue);
    this.setState({updatedData: newValue});
    this.setState({fileContent: newValue});
  }
  fetchFile() {
    let tool = this.props.cardTitle.toLowerCase();
    let toolType;
    if(tool == 'jenkins' || tool=='bamboo' || tool=='sonar') {
      toolType = 'build';
    } else
    if(tool == 'jira') {
      toolType = 'feature';
    } else
    if(tool == 'bitbucket' || tool=='github' || tool=='gitlab') {
      toolType = 'scm';
    }
    $.ajax({
       url:"/getContent",
       type: 'POST',
       data: {rootPath: this.props.rootPath ,tool: tool, toolType: toolType},
       success: function(res)
       {
         console.log(res);
         this.setState({fileContent: res, updatedData: res});
       }.bind(this),
       error: function(err)
       {
         //console.log('inside failure');
         //console.log(err.responseText);
       }.bind(this)
     });
  }
  updateFile() {
    let context = this;
    let tool = this.props.cardTitle.toLowerCase();
      let toolType;
      if(tool == 'jenkins' || tool=='bamboo' || tool=='sonar') {
        toolType = 'build';
      } else
      if(tool == 'jira') {
        toolType = 'feature';
      } else
      if(tool == 'bitbucket' || tool=='github' || tool=='gitlab') {
        toolType = 'scm';
      }
    $.ajax({
       url:"/updateContent",
       type: 'POST',
       data: {
         content: context.state.updatedData,rootPath: this.props.rootPath ,tool: tool, toolType: toolType
       },
       success: function(res)
       {
         console.log(res);
         this.setState({
           isOpen: false
         });
         this.updateSuccessAlert();
       }.bind(this),
       error: function(err)
       {
         //console.log('inside failure');
         //console.log(err.responseText);
       }.bind(this)
     });
  }
  restartJavaApp() {
    $.ajax({
       url:"/restart/restartJavaApp",
       type: 'POST',
       data: {
         tool:  this.props.cardTitle.toLowerCase()
       },
       success: function(res)
       {
         console.log(res);
       }.bind(this),
       error: function(err)
       {
         //console.log('inside failure');
         //console.log(err.responseText);
       }.bind(this)
     });
  }
updateSuccessAlert() {
  //console.log("inside check for Scenario updated successfully alert");
  let context = this;
  this.refs.asd.success(
    'property file updated successfully',
    '', {
    timeOut: 3000,
    extendedTimeOut: 3000
  }
);
}
  render() {
    console.log(this.props.cardTitle);
        return(
          <div>
            <div className="card card-01">
              <div className="clickCursor">
              <span onClick={this.restartJavaApp} className="glyphicon glyphicon-refresh clickCursor" style={{zIndex: 1,color:"blue", float: "right", marginRight:"15px", marginTop:"10px"}}></span>
              </div>
              <div onClick={this.modalForEditor} className="clickCursor">
                      <div className="profile-box">
                          <img className="card-img-top rounded-circle" src={this.props.cardImage} alt="Card image cap"/>
                      </div>
                      </div>
                      <div className="card-body text-center">
                        <div onClick={this.modalForEditor} className="clickCursor">
                        <h4 className="card-title" style={{fontSize:"18px",paddingBottom:"10px"}}>{this.props.cardTitle}</h4>
                      </div>
                        {/* <p className="card-text">{this.props.cardContent}</p> */}
                      </div>
                      {/* <button onClick={this.restartJavaApp} className="btn btn-primary" style={{width:"30px",height:"30px",borderRadius:"50%",textAlign:"center"}}> */}

                      {/* </button> */}
            </div>
                    <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
                        <ModalHeader>
                          {/* <ModalClose onClick={this.hideModal}/> */}
                          <a onClick={this.hideModal}  className="clickCursor" style={{float:'right',margin:'5px 5px 0px 5px',color:'red'}}>
                            <span className="glyphicon glyphicon-remove"></span>
                          </a>
                          <a onClick={this.updateFile}  className="clickCursor" style={{float:'right',margin:'5px 5px 0px 5px',color:'green'}}>
                            <span className="glyphicon glyphicon-ok"></span>
                          </a>
                          <ModalTitle style={{float:'left'}}>{'Property File for '+this.props.cardTitle}</ModalTitle>

                        </ModalHeader>
                        <ModalBody>
                          <AceEditor
                            mode="properties"
                            theme="monokai"
                            onChange={this.onChangeData}
                            value={this.state.fileContent}
                            name="aceEditor"
                            editorProps={{$blockScrolling: true}}
                            style={{margin:'auto'}}
                        />
                        </ModalBody>
                    </Modal>
                    <ToastContainer ref='asd'
                          toastMessageFactory={ToastMessageFactory}
                          className='toast-top-center' style={{marginTop:'8%'}}/>
          </div>
        );
}
}

module.exports = Card;
