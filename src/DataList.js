import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleMoreOptions = this.handleMoreOptions.bind(this);

    this.state = {
      showOptions: false,
      inputFieldText: '',
      selectedOptionId: '',
      isMoreOptionClicked:false,
      showMoreOptions: false,
      searchString:''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedId != this.props.selectedId) {
      var selected_item = this.props.options.filter((value) => value[this.props.id] == this.props.selectedId)[0];
      if (selected_item != undefined) {
        let searchString = this._handleGetSearchString(selected_item[this.props.left]);
        
        this.setState({ 
          selectedOptionId: selected_item[this.props.id], 
          inputFieldText: selected_item[this.props.left], 
          searchString:searchString });
      }
    }
    // else {
    //   this.setState({ selectedOptionId: 0, inputFieldText: '' });
    // }
  }

  _handleGetSearchString(input_value){
    let searchString = [...input_value].map(char => /[()]/g.test(char) ? '\\'+char : char).join('');
    return searchString;
  }

  handleOnBlur() {
    if (this.state.isMoreOptionClicked) {
      this.setState({ isMoreOptionClicked:false});
      this.nameInput.focus();
    }
    else {
      this.handleHideOptions();
    }
  }

  handleShowOptions() {
    this.setState({ showOptions: true });
  }

  handleHideOptions() {
    this.setState({ showOptions: false,showMoreOptions: false });
  }

  handleMoreOptions() {
    this.setState({ isMoreOptionClicked:true,showMoreOptions: true});
  }

  _handleonOptionChange(){
    if ('onOptionChange' in this.props && typeof this.props.onOptionChange == 'function' ){
      this.props.onOptionChange();
    }
  }

  handleChange(e) {
    var input_value = e.target.value;  
    if (input_value != '') {
      if (/[()]/g.test(input_value)){
        let searchString = this._handleGetSearchString(input_value);
        this.setState({ inputFieldText: input_value,searchString:searchString});
      }
      else{
        this.setState({ inputFieldText: input_value,searchString:input_value});
      }
    }
    else {
      this.setState({ inputFieldText: input_value, selectedOptionId: 0,searchString:'' }, this._handleonOptionChange());
    }
  }

  handleSelect(index) {
    var selected_item = this.props.options.filter((value) => value[this.props.id] == index)[0];
    if (selected_item != undefined) {
      this.setState({ selectedOptionId: selected_item[this.props.id], inputFieldText: selected_item[this.props.left] }, this._handleonOptionChange());
      this.handleHideOptions();
    }
  }

  renderOptions() {
    var options; 
    options = this.props.options
        .filter((value) => RegExp('^' + this.state.searchString + '.*', 'i').test(value[this.props.right]) || 
                           RegExp('^' + this.state.searchString + '.*', 'i').test(value[this.props.left]))
        .map((option) => {
          return <li value={option[this.props.left]} key={option[this.props.id]} className='clearfix' onMouseDown={() => this.handleSelect(option[this.props.id])}>
            <a> <span className='float-left'>{option[this.props.left]} </span><span className='float-right'>{option[this.props.right]}</span> </a>
          </li>;
        });
    if (!this.state.showMoreOptions) {
      if(options.length > 10){
        options = options.slice(0,10);
        options.push(<li key='-1' onMouseDown={() => this.handleMoreOptions()}><a>more options</a></li>);
      }
    }

    return (
      <div className={this.state.showOptions ? 'reactDatalist_show' : 'reactDatalist_hide'}>
        <div className='reactDatalist_options'>
          <ul className='reactDatalist_options_list'>
            {options}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='reactDatalist'>
          <input type='text' ref={(input) => { this.nameInput = input; }} className='reactDatalist_input' 
          onSelect={() => this.handleShowOptions()} onBlur={() => this.handleOnBlur()} 
          onChange={this.handleChange.bind(this)} value={this.state.inputFieldText} />
          {this.renderOptions()}
          <input type='hidden' name={this.props.selectedIdName} value={this.state.selectedOptionId} />
      </div>
    );
  }

}

DataList.propTypes = {
  options: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func,
  selectedIdName: PropTypes.string.isRequired,
  selectedId:PropTypes.string.isRequired,
};

export default DataList;