import React, { useEffect, useState } from 'react'
import Comment from './Comment';
import '../css/Post.css'
import AddPost from './AddPost';
import { useParams } from 'react-router-dom';
import PageNumber from './PageNumber';

const Post = (props) => {
    const [loading, setLoading] = useState(false);

    const [dataPosts, setdataPosts] = useState();
    let { id } = useParams();

    const getDataPost = async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
            .then(response => response.json())
            .then(json => {
                setdataPosts(json);
                setLoading(true);
            })
    }
    useEffect(() => {
        // alert(`/something/${id}`);

        getDataPost()
    }, [id]);

    const DeletePostHandle = async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts/' + dataPosts.id, {
            method: 'DELETE',
        });
        getDataPost();
        alert(`Post ID : ${dataPosts.id} deleted`)
    }
    const UpdatePostHandle = async () => {
        let termArr = Object.assign({}, dataPosts);
        termArr.title = 'test update title'
        termArr.body = 'test update body';
        setdataPosts(termArr);
    }
    if (loading) {
        return (
            <div>
                <PageNumber id={parseInt(id)} />
                <AddPost ></AddPost>
                <div className='post_type'>Post &darr;</div>
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
                <div className='comment_type'>Comments &darr;</div>
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