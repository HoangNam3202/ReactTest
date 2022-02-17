import React, { useEffect, useState } from 'react'
import Comment from './Comment';
import '../css/Post.css'
import AddPost from './AddPost';

const Post = (props) => {
    const [loading, setLoading] = useState(false);

    const [dataPosts, setdataPosts] = useState();

    const getDataPost = async() => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + props.currentPage)
        .then(response => response.json())
        .then(json => {
            setdataPosts(json);
            setLoading(true);
        })
    }
    useEffect(() => {
        getDataPost()
    }, [props.currentPage]);

    const DeletePostHandle = async() => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + dataPosts.id, {
            method: 'DELETE',
        });
        getDataPost();
        alert(`Post ID : ${dataPosts.id} deleted`)
    }
    const UpdatePostHandle = async() => {
        let termArr = Object.assign({}, dataPosts);
        termArr.title = 'test update title'
        termArr.body = 'test update body';
        setdataPosts(termArr);
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
                    <div>
                        <button onClick={UpdatePostHandle}>Update Post</button>
                    </div>
                </div>
                <div className='comment_type'>Comments v</div>
                <Comment idPost={dataPosts.id}></Comment>
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