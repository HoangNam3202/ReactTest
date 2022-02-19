import React from 'react'
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Post from './Post';
import '../css/Manager.css'
const Manager = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to='/post/1' />} />
                <Route path="/post/:id" element={<Post />} />

            </Routes>
        </div>

    );
}
export default Manager;