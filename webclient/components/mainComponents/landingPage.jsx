const React = require('react');
const {hashHistory} = require('react-router');
import Card from './Card.jsx';
class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      collectorsArray: [{toolName: 'Jenkins', image: 'https://jenkins.io/images/226px-Jenkins_logo.svg.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'},
      {toolName: 'Bamboo',  image: 'http://blog.falafel.com/wp-content/uploads/2015/05/logoBambooPNG.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'},
      {toolName: 'Sonar',  image: 'https://docs.sonarqube.org/download/attachments/6389860/SONARNEXT?version=1&modificationDate=1440424676000&api=v2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'},
      {toolName: 'Jira',  image: 'https://a.slack-edge.com/ae7f/plugins/jira/assets/service_512.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'},
      {toolName: 'BitBucket',  image: 'https://cdn2.iconfinder.com/data/icons/designer-skills/128/bitbucket-repository-svn-manage-files-contribute-branch-512.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'},
      {toolName: 'GitHub',  image: 'https://image.flaticon.com/icons/png/512/25/25231.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'},
      {toolName: 'GitLab',  image: 'https://img.stackshare.io/service/880/lmalkclL.png', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In imperdiet lectus vulputate laoreet fermentum. Morbi porttitor mollis imperdiet. Nunc venenatis quam id elit euismod, ac ullamcorper nisi auctor.'}
    ],
      isOpen: true
    };
    // this.fetchFile = this.fetchFile.bind(this);
  }

  render() {
        return(
          <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="#" style={{color:'white'}}>Continuous Delivery Analytics Platform</a>
                  </div>
                </div>
              </nav>
            <div className='container'>
              <div className='row' style={{marginTop:"5%"}}>
                {
                  this.state.collectorsArray.map(function(item, key) {
                    return (<div key={key} className="col-md-3 col-sm-6 col-lg-3">
                          <Card cardTitle={item.toolName}  cardImage={item.image}  cardContent={item.content} rootPath='C:/Users/ar351538/Downloads/CDAP-master/CDAP-master'/>
                    </div>);
                  })
                }
              </div>

            </div>
  <div>
      <nav className="navbar" id="footer" >
       <div id = "ribbon" className="row footer-brand-colour">
             <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
             <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"></div>
         </div>
            <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital
          </p>
        </nav>
    </div>
          </div>
        );
}
}

module.exports = LandingPage;
