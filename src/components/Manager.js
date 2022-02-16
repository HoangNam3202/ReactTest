import React, { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Post from './Post';
import '../css/Manager.css'
const Manager = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSize, setdataSize] = useState();
    useEffect(async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setdataSize(json.length);
            })
    }, []);

    const IncreasePage = () => {
        setCurrentPage(currentPage => Number.parseInt(currentPage) + 1);
    }
    const DecreasePage = () => {
        setCurrentPage(currentPage => Number.parseInt(currentPage) - 1);
    }
    const InputPage = (number) => {
        if (number < 0 || number > dataSize) {
            setCurrentPage(1);
            alert('Page Error !')
        }
        else {
            setCurrentPage(number);
        }
    }

    return (
        <BrowserRouter>
            <div>
                <div>
                    <div>Post number</div>
                    <div className='pagination'>
                        <button disabled={(currentPage <= 1) ? true : false} onClick={DecreasePage}>PREV</button>
                        <div>
                            <input type='number' value={currentPage} onChange={(number) => { InputPage(number.target.value) }}></input>
                        </div>
                        <button disabled={currentPage >= dataSize ? true : false} onClick={IncreasePage}>NEXT</button>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Post currentPage={currentPage} />} />

            </Routes>
        </BrowserRouter>

    );
}
export default Manager;