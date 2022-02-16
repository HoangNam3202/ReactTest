import React, { useEffect, useState } from 'react'
import '../css/Comment.css'


const Comment = (props) => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [dataComments, setdataComments] = useState([]);
    useEffect(async () => {
        await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + props.currentPage)
            .then(response => response.json())
            .then(json => {
                setdataComments(json);
                setLoading(true)
            })
    }, [props.currentPage]);
    const DeletePostHandle = (index) => {
        dataComments.splice(index, 1);
        setdataComments(prevData => [...prevData])
    }
    if (loading) {
        return (
            <div className='Comments_par'>
                <div>
                    {
                        dataComments.map((item, index) => {
                            return (
                                <div key={index} className='Comment_item'>
                                    <div>name : {item.name}</div>
                                    <div>email : {item.email}</div>
                                    <div>body : {item.body}</div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                DeletePostHandle(index)
                                            }}>
                                            Delete Comment
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <div>Loading</div>
        );
    }
}
export default Comment;