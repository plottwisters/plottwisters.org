import React, {Component} from 'react';

class Leaf extends React.Component {



    render() {

      let data = this.props.node.children;

      if(this.props.node.children == undefined) {
        data = [];
      }
      let children = data.map((childData)=>(
        <Leaf  key={childData.value} toggleVisibility={this.props.toggleVisibility} toggleExpansion={this.props.toggleExpansion} expandedTrails={this.props.expandedTrails}  checkedTrails={this.props.checkedTrails} node={childData}/>
      ));
      let isExpanded = (this.props.expandedTrails[this.props.node.value]!= undefined);
      return(
      <div className="plot">
        <input className="plotVisibility" checked={this.props.checkedTrails[this.props.node.value]!= undefined}  onChange={()=>{this.props.toggleVisibility(this.props.node.value)}}  type="checkbox"/>
        <span className="plotName">{this.props.node.label}</span>
        <div className="expandCarrot"  style={{display: (this.props.node.children != undefined && this.props.node.children.length != 0)?'block':'none'}} onClick={()=>{this.props.toggleExpansion(this.props.node.value)}}></div>
        <div className="divider"></div>
        <div style={{display: (isExpanded)?'block':'none'}}>
        {children}
        </div>
      </div>
      );
    }
}

export default Leaf;
