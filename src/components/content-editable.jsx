import React,{Component} from 'react';

class ContentEditable extends Component{
    domRef = React.createRef();
    getDOMNode(){
        return this.domRef.current;
    }
    render(){
        return <div 
            className="content-editable"
            ref={this.domRef}
            onInput={this.emitChange} 
            onBlur={this.emitChange}
            contentEditable
            dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
    }
    shouldComponentUpdate(nextProps){
        return nextProps.html !== this.getDOMNode().innerHTML;
    }
    emitChange = ()=>{
        var html = this.getDOMNode().innerHTML;
        window.Telem = this.getDOMNode();
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
};

export default ContentEditable;