import React, { useState } from 'react';
import './List.css';

function List (props) {
    const {
        list,
        addNewItemToList,
        removeItemFromList,
        removeSubList,
        addSubList,
        moveItemDown,
        moveItemUp
    
    } = props;
    
    const [valueInput, onChangeInput] = useState('');
    // const [stateList, updateList]

    return (
        <React.Fragment>
            <ul>
                {   
                    list.items.map((item, index) => (
                        <li key={item.value}>
                            {item.value}
                            {
                                index === 0
                                ? null
                                : <button className="arrow-up" onClick={() => moveItemUp(item, list)}>&uarr;</button>
                            }

                            {
                                index === list.items.length - 1
                                ? null
                                : <button className="arrow-down" onClick={() => moveItemDown(item, list)}>&darr;</button>
                            }
                            
                            <button type="button" onClick={() => removeItemFromList(list, item.value)}>Remove item</button> 
                            { 
                                item.subList 
                                ? 
                                <React.Fragment>
                                    <button type="button" onClick={() => removeSubList(item, item.subList)}>Remove sublist</button>
                                    <List moveItemDown={moveItemDown} moveItemUp={moveItemUp} addSubList={addSubList} removeSubList={removeSubList} removeItemFromList={removeItemFromList} addNewItemToList={addNewItemToList} list={item.subList} />

                                </React.Fragment>
                                
                                : 
                                <button type="button" onClick={() => addSubList(item)}>Add sublist</button>
                            }
                        </li>
                    ))
                }
                <li>
                    <input type="text" value={ valueInput } onChange={(e) => onChangeInput(e.target.value)}/> <button type="button" onClick={(e) => (addNewItemToList(list, valueInput), onChangeInput(''))}>Add</button>
                </li>
            </ul>
        </React.Fragment>
    )
}

export default List;