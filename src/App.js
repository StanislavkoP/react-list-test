import React, { useState } from 'react';
import List from './List';
import './App.css';

const initStateList = [
		{
			id: 0,
			items: [
				{
					value: 'Item 1'
				},
				{
					value: 'Item 2',
					subList: {
						id: 1,
						items: [
							{
								value: 'Item 1'
							},
							{
								value: 'Item 2'
							},
							{
								value: 'Item 3'
							},
						],
					}
				},
				{
					value: 'Item 3'
				},
			]
		}
	]



function App() {
	const [lists, setList] = useState(initStateList);

	function removeSubList(parentList) {
		delete parentList.subList;
		const newArray = lists.concat([]);
		setList(newArray);
	}

	function addSubList(parentList) {
		parentList.subList = {
			id: `f${(~~(Math.random()*1e8)).toString(16)}`,
			items: []
		};
		const newArray = lists.concat([]);
		setList(newArray);
	}

	function removeItemFromList(list, value) {
		const findedItem = list.items.findIndex(item => item.value.toLowerCase().includes(value.toLowerCase()));
		
		if (findedItem > -1) {
			list.items.splice(findedItem, 1);
			const newArray = lists.concat([]);
			setList(newArray);
		}
	
	}
	
	function addNewItemToList(list, value) {
		list.items.push({
			id: `f${(~~(Math.random()*1e8)).toString(16)}`, 
			value: value
		});
		const newArray = lists.concat([]);
		setList(newArray);
	};

	function moveItemDown(item, list) {
		const findedItem = list.items.findIndex(_item => _item.value.toLowerCase().includes(item.value.toLowerCase()));
		
		if (findedItem > -1) {
			list.items.splice(findedItem, 1);;
			list.items.splice(findedItem + 1, 0, item);
			const newArray = lists.concat([]);
			setList(newArray);
		}
	}

	function moveItemUp(item, list) {
		const findedItem = list.items.findIndex(_item => _item.value.toLowerCase().includes(item.value.toLowerCase()));
		
		if (findedItem > -1) {
			console.log(findedItem);
			list.items.splice(findedItem, 1);
			list.items.splice(findedItem - 1, 0, item);
			const newArray = lists.concat([]);
			setList(newArray);
		}
	}

	return (

		<div className="App">
			{
				lists
					? lists.map(list => (<List moveItemDown={moveItemDown} moveItemUp={moveItemUp} addSubList={addSubList} removeSubList={removeSubList} removeItemFromList={removeItemFromList} addNewItemToList={addNewItemToList} key={list.id} list={list} />))
					: null

			}
		</div>
	);
}

export default App;
