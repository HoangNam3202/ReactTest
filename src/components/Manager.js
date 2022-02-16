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
                dataSize(json.length);
            })
    }, []);

    const IncreasePage = () => {
        setCurrentPage(currentPage => (currentPage + 1));
    }
    const DecreasePage = () => {
        setCurrentPage(currentPage => (currentPage - 1));
    }
    return (
        <BrowserRouter>
            <div>
                <div className='pagination'>
                    <button disabled={(currentPage <= 1) ? true : false} onClick={DecreasePage}>PREV</button>
                    <div>
                        <input type='number' value={currentPage} onChange={(number)=>{setCurrentPage(number.target.value)}}></input>
                    </div>
                    <button disabled={currentPage > dataSize ? true : false} onClick={IncreasePage}>NEXT</button>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Post currentPage={currentPage} />} />

            </Routes>
        </BrowserRouter>

    );
}
export default Manager;