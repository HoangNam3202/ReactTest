import React, { useEffect, useState } from 'react'
import Comment from './Comment';
import '../css/Post.css'
import AddPost from './AddPost';

const Post = (props) => {
    const [loading, setLoading] = useState(false);

    const [dataPosts, setdataPosts] = useState([]);
    useEffect(async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + props.currentPage)
            .then(response => response.json())
            .then(json => {
                setdataPosts(json);
                setLoading(true)
            })
    }, [props.currentPage]);

    const DeletePostHandle = async() => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + dataPosts.id, {
            method: 'DELETE',
        });
        
    }
    if (loading) {
        return (
            <div>
                <AddPost ></AddPost>
                <div className='Post_par'>
                    <div>
                        <div>title : {dataPosts.title}</div>
                        <div>body : {dataPosts.body}</div>
                    </div>
                    <div>
                        <button onClick={DeletePostHandle}>Delete Post</button>
                    </div>
                </div>
                <div className='comment_type'>Comments v</div>
                <Comment currentPage={props.currentPage}></Comment>
            </div>
        );
    }
    else {
        return (
            <div>Loading</div>
        );
    }
}
export default Post;