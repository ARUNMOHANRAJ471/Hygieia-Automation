const React = require('react');
const {hashHistory} = require('react-router');
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/properties';
import 'brace/theme/monokai';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      fileContent: '',
      updatedData: ''
    };
    this.fetchFile = this.fetchFile.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
  }
  onChangeData(newValue) {
    console.log(newValue);
    this.setState({updatedData: newValue});
    this.setState({fileContent: newValue});
  }
  fetchFile() {
    $.ajax({
       url:"/getContent",
       type: 'GET',
       success: function(res)
       {
         console.log(res);
         this.setState({fileContent: res});
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
    $.ajax({
       url:"/updateContent",
       type: 'POST',
       data: {
         content: context.state.updatedData
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
  render() {
        return(
          <div>
            <button type="button" className="btn btn-info" onClick={this.fetchFile}>getContent</button>
            <AceEditor
              mode="properties"
              theme="monokai"
              onChange={this.onChangeData}
              value={this.state.fileContent}
              name="aceEditor"
              editorProps={{$blockScrolling: true}}
          />
          <button type="button" className="btn btn-info" onClick={this.updateFile}>update</button>
          </div>
        );
}
}

module.exports = Login;
