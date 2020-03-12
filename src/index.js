import React from 'react';
import ReactDOM from 'react-dom';
import DataList from './DataList';

var cars = [
  { id: 1, model: "CRV", company: "Honda" },
  { id: 2, model: "Accord", company: "Honda" },
  { id: 3, model: "800", company: "Maruti" },
  { id: 4, model: "Civic", company: "Honda" },
  { id: 5, model: "Model S", company: "Tesla" },
  { id: 6, model: "Model 3", company: "Tesla" },
  { id: 7, model: "Model X", company: "Tesla" },
  { id: 8, model: "Corolla", company: "Toyota" },
  { id: 9, model: "Rav4", company: "Toyota" },
  { id: 10, model: "Camry", company: "Toyota" },
  { id: 11, model: "Innova", company: "Toyota" },
  { id: 12, model: "Yaris", company: "Toyota" },
  { id: 13, model: "Prius", company: "Toyota" },
  { id: 14, model: "Highlander", company: "Toyota" },
  { id: 15, model: "Grand Cherokee", company: "Jeep" },
  { id: 16, model: "Wrangler", company: "Jeep" },
  { id: 17, model: "Comanche", company: "Jeep" }
];

class DataListExample {
  constructor (options) {
		if (typeof options === "undefined") options = {};
		options.el = options.el || document.getElementById('example');

		ReactDOM.render(React.createElement(DataList, {
			options:cars,
      id:'id',
      left:'model',
      right:'company',
      selectedIdName:'selectedCar',
      selectedId:'',
      onOptionChange:{}
		}), options.el);
	}
}

export {DataListExample,DataList};