import React, { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";
import Post from './Post';
import '../css/Manager.css'
const PageNumber = (props) => {
    // let { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [dataSize, setdataSize] = useState();
    useEffect(() => {
        if (props.id) {
            const ID = parseInt(props.id)
            setCurrentPage(ID)
        }
    }, [props.id]);
    useEffect(async () => {
        // alert(`/something/${id}`);

        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                setdataSize(json.length);
            })
    }, []);

    const InputPage = (number) => {
        if (!number || number < 0 || number > dataSize) {
            alert('Inviable Page !')
        }
        else {
            window.location.href = '/post/' + number
            setCurrentPage(number);
        }
    }

    return (
        <div>
            <div>
                <div>
                    <div>Post number</div>
                    <div className='pagination'>
                        {props.id - 1 > 0 ?
                            <Link to={'/post/' + (props.id - 1)}>PREV</Link>
                            : null
                        }
                        <div>
                            <input type='number' value={props.id} onChange={(number) => { InputPage(number.target.value) }}></input>
                        </div>
                        {props.id < dataSize ?
                            <Link to={'/post/' + (props.id + 1)}>NEXT</Link>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}
export default PageNumber;