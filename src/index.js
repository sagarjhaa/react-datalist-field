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
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedId) {
      var selected_item = this.props.options.filter((value) => value[this.props.id] == nextProps.selectedId)[0];
      if (selected_item != undefined) {
        this.setState({ selectedOptionId: selected_item[this.props.id], inputFieldText: selected_item.display_name });
      }
    }
    else {
      this.setState({ selectedOptionId: 0, inputFieldText: '' });
    }
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

  handleChange(e) {
    var input_value = e.target.value;
    if (input_value != '') {
      this.setState({ inputFieldText: input_value});
    }
    else {
      this.setState({ inputFieldText: input_value, selectedOptionId: 0 }, () => this.props.onOptionChange());
    }
  }

  handleSelect(index) {
    var selected_item = this.props.options.filter((value) => value[this.props.id] == index)[0];
    if (selected_item != undefined) {
      this.setState({ selectedOptionId: selected_item[this.props.id], inputFieldText: selected_item.display_name }, () => this.props.onOptionChange());
      this.handleHideOptions();
    }
  }

  renderOptions() {
    var options;
    options = this.props.options
        .filter((value) => RegExp('^' + this.state.inputFieldText + '.*', 'i').test(value[this.props.value2]) || RegExp('^' + this.state.inputFieldText + '.*', 'i').test(value[this.props.value1]))
        .map((option) => {
          return <li value={option[this.props.value1]} key={option[this.props.id]} className='clearfix' onMouseDown={() => this.handleSelect(option[this.props.id])}>
            <a> <span className='float-left'>{option[this.props.value1]} </span><span className='float-right'>{option[this.props.value2]}</span> </a>
          </li>;
        });
    if (!this.state.showMoreOptions) {
      if(options.length > 10){
        options = options.slice(0,10);
        options.push(<li key='11' onMouseDown={() => this.handleMoreOptions()}><a>more options</a></li>);
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
          <input ref={(input) => { this.nameInput = input; }} className='reactDatalist_input' onSelect={() => this.handleShowOptions()} onBlur={() => this.handleOnBlur()} onChange={this.handleChange.bind(this)} value={this.state.inputFieldText} />
          {this.renderOptions()}
          <input type='hidden' name={this.props.selectedIdName} value={this.state.selectedOptionId} />
      </div>
    );
  }

}

DataList.propTypes = {
  options: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value1: PropTypes.string.isRequired,
  value2: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  selectedIdName: PropTypes.string.isRequired,
  selectedId:PropTypes.string.isRequired,
};

export default DataList;