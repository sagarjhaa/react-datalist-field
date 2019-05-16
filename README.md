# react-datalist-field [demolink](https://wk9i5.codesandbox.io/)

[![Edit react-datalist-field](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/reactdatalistfield-wk9i5?fontsize=14)

React datalist component

### Installation

```sh
npm install react-datalist-field --save
```

### Demo

[demolink](https://wk9i5.codesandbox.io/)

### Usage

```javascript
import React from 'react';
import DataList from 'react-datalist-field';

function YourComponent() {
  const [state, setState] = useState({ x: 10, y: 10 });

  var cars = [
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
        {id=1,model='',company=''},
      ]
    
    return (
            <DataList options={cars} id='id' value1='model' value2='company' onOptionChange={this.handleChange} selectedId=''
            selectedIdName='selectedCard' />
      </form>
    );
}
```

### Styling

### styling DataList
|class name                                     |description|
|----------                                     |-----------|
|.reactDatalist_input                           |           |
|.reactDatalist_show                            |           |
|.reactDatalist_hide                            |           |
|.reactDatalist_options                         |           |
|.reactDatalist_options::-webkit-scrollbar      |           |
|.reactDatalist_options_list                    |           |
|.reactDatalist_options_list li                 |           |
|.reactDatalist_options_list li .float-right    |           |
|.reactDatalist_options_list li .float-left     |           |
|.reactDatalist_options_list li a               |           |
|.reactDatalist_options_list li:hover           |           |
|.reactDatalist_options_list li:hover a         |           |


### Props

| Name           | Type     | Description                           | Default |
| ---------      | -------- | ------------------------------------- | ------- |
| options        | array    | all the items for datalist            | null    |
| id             | string   | string name for selected value        | null    |
| value1         | string   | string name for left value of datalist| null    |
| value2         | string   | string name for right value of datalist| null    |
| onOptionChange | function | function to trigger when option value change|null|
| selectedIdName | string   | input element name for selected option value|null|
| selectedId     | string   | key value to set selected value for DataList|null|
