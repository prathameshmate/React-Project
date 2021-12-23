import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

//getting data from local storage
const getData = () => {
    const getStrArr = localStorage.getItem("Lists");

    // console.log(getStrArr);

    if (getStrArr) {
        return JSON.parse(getStrArr);
    }
    else{
        return [];
    }

}

const App = () => {

    const [data, upadateData] = useState("");
    const [arr, updateArr] = useState(getData());
    const [toggle, updateToggle] = useState(true);
    const [isEditItem, updateIsEditItem] = useState("");

    // adding data into localstorage
    useEffect(() => {
        localStorage.setItem("Lists", JSON.stringify(arr))
    }, [arr])

    const item = (event) => {
        const value = event.target.value;
        upadateData(value);
    }

    const addItems = () => {

        if (!data || data[0] === " ") {
            toast.warn("Fill The Data...", { position: "bottom-center", autoClose: 3000 });
        }
        else if (!toggle && data) {

            const newArr = arr.map((elem) => {
                if (isEditItem === elem.id) {
                    return { ...elem, name: data };
                }
                return elem;
            })
            updateArr(newArr);

            toast.success("Data Update Successfully...", { position: "bottom-center", autoClose: 3000 });

            upadateData("");
            updateIsEditItem(null);
            updateToggle("True");

        }
        else {
            const obj = { name: data, id: new Date().getTime().toString() }
            updateArr(() => {
                return ([...arr, obj]);
            })

            toast.success("Data Added Successfully...", { position: "bottom-center", autoClose: 3000 });

            upadateData("");

        }
    }

    const deleteItems = (getID) => {
        const newArr = arr.filter((elem) => {
            return (elem.id !== getID)
        });

        updateArr(newArr);

        toast.success("Data Remove Successfully... " , {position : "bottom-center" , autoClose : 3000 })
    }

    const clearAll = () => {
        updateArr([]);
        toast.success("All Data Remove Successfully..." , {position : "bottom-center" , autoClose : 3000})
    }

    //edit Items
    const editItem = (getID) => {

        const accesObj = arr.find((elem) => {
            return (getID === elem.id);
        })

        // console.log(accesObj)

        updateToggle(false);

        upadateData(accesObj.name);

        updateIsEditItem(getID);

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
                                    <div className='item_list' key={elem.id}>
                                        <div className='data'>
                                            <h2>{elem.name}</h2>
                                        </div>
                                        <div className='icons'>

                                            <i className="fas fa-edit" onClick={() => { editItem(elem.id) }} />
                                            <i className="fas fa-trash deletIcon " onClick={() => { deleteItems(elem.id) }} />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='mainbtn'>

                        <button type="button" className="btn btn-primary" onClick={clearAll}>Clear All</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default App;