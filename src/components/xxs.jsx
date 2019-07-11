import React, {Component} from 'react';
import ContentEditable from './content-editable';
import './xxs.css';

//https://stackoverflow.com/questions/33644499/what-does-it-mean-when-they-say-react-is-xss-protected

const _alertHTML = "<img onerror='alert(\"Hacked!\")' src='invalid-image' />";
const userWebsite = "javascript:alert('Hacked!');";
const base64Data = "data:text/html;base64,PHNjcmlwdD5hbGVydCgiSGFja2VkISIpOzwvc2NyaXB0Pg==";

class CrossSiteScriptingExample extends Component{
    state = {
        dataHtml: _alertHTML
    }
    onChange = (e) => {
        const {value} = e.target;
        this.setState({
            dataHtml: encodeURI(value)
        });
    }
    render(){
        const {dataHtml} = this.state;
        return (
            <ul>
                <li>
                    <div className="content-block">
                        <h3>Attack by dangerouslySetInnerHTML</h3>
                        <ContentEditable onChange={this.onChange} html={dataHtml}/>
                        <div dangerouslySetInnerHTML={{__html: dataHtml}}>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="content-block">
                        <h3>Attack by URL</h3>
                        <a href={userWebsite}>Go To Home</a>
                    </div>
                </li>
                <li>
                    <div className="content-block">
                        <h3>Attack by Base64 Encode Data</h3>
                        <a href={base64Data}>Go To Home</a>
                    </div>
                </li>
            </ul>
        )
    }
} 

export default CrossSiteScriptingExample;