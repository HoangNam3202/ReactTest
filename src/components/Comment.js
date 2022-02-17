import React, { useEffect, useState } from 'react'
import '../css/Comment.css'


const Comment = (props) => {
    // const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [dataComments, setdataComments] = useState([]);
    useEffect(async () => {
        await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + props.idPost)
            .then(response => response.json())
            .then(json => {
                setdataComments(json);
                setLoading(true)
            })
    }, [props.idPost]);
    const DeleteCommentHandle = async (index, id, email) => {

        var ConfirmCheck = window.confirm(`Delete Comment ID: ${id} and EMAIL: ${email} ?`)
        if (ConfirmCheck) {
            dataComments.splice(index, 1);
            setdataComments(prevData => [...prevData])
            // alert(`Comment ${id} deleted`)

            await fetch('https://jsonplaceholder.typicode.com/comments/' + id, {
                method: 'DELETE',
            });
        }
    }
    const UpdateCommentHandle = async(item, index) => {
        let termArr = Object.assign([], [...dataComments]);
        termArr[index].name = 'HoangNam'
        termArr[index].email = 'nam@gmail.com';
        termArr[index].body = 'test comment';
        setdataComments(termArr);
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
                                                DeleteCommentHandle(index, item.id, item.email)
                                            }}>
                                            Delete Comment
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={
                                            ()=>{
                                                UpdateCommentHandle(item, index);
                                            }
                                        }>
                                            Update Post
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