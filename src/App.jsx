import React, { useState } from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
const App = () => {

    const [data, upadateData] = useState("");
    const [arr, updateArr] = useState([]);
    const [toggle, updateToggle] = useState(true);
    const [isEditItem, updataIsEditItem] = useState();

    const item = (event) => {
        const value = event.target.value;
        upadateData(value);
    }

    const addItems = () => {

        if (!data || data[0] === " ") {
            alert("fill the data...");
        }
        else if (!toggle && data) {
            updateArr(
                arr.map((elem) => {
                    if (isEditItem === elem.id) {
                        return { ...elem, name: data }
                    }
                    return elem;
                })

            );

            upadateData("");
            updataIsEditItem(null);
            updateToggle("True");

        }
        else {
            const obj = { name: data, id: new Date().getTime().toString() }
            updateArr((arr) => {
                return ([...arr, obj]);
            })
            upadateData("");
        }
    }

    const deleteItems = (getID) => {
        const newArr = arr.filter((elem) => {
            return (elem.id !== getID)
        });

        updateArr(newArr);
    }

    const clearAll = () => {
        updateArr([]);
    }

    //edit Items
    const editItem = (getID) => {

        const accesObj = arr.find((elem) => {
            return (getID === elem.id);
        })
        console.log(accesObj)

        updateToggle(false);

        upadateData(accesObj.name);

        updataIsEditItem(getID);

    }
    return (
        <>

            <div className='container'>
                <div>

                    <div className='inpfeild'>
                        <input type="text" className='inp' value={data} placeholder='Enter Items' onChange={item} />
                        {
                            toggle ? <i className="fas fa-plus-circle" onClick={addItems}></i> : <i className="fas fa-edit" onClick={addItems}></i>
                        }
                    </div>
                    <div className='datafeild'>
                        {
                            arr.map((elem) => {
                                return (
                                    <div className='item_list'>
                                        <h2>{elem.name}</h2>
                                        <i class="fas fa-edit" onClick={() => { editItem(elem.id) }} />
                                        <i className="fas fa-trash deletIcon " onClick={() => { deleteItems(elem.id) }} />
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='mainbtn'>

                        <button type="button" className="btn btn-primary" onClick={clearAll}>Clear All</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;