import React, { useEffect, useState } from 'react'


const AddPost = (props) => {
    const Add = async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                // userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert(`post ${json.title} đã được thêm` )
            });
    }
    return (
        <div>
            <button onClick={Add}>Add Post</button>
        </div>
    );
}
export default AddPost;