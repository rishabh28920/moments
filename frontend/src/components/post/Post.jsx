import "./post.css"
import {Link, useLocation} from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

function Post({post}) {
    
    const PF = "https://moments-backend-one.vercel.app/images/"
    return (
        <div className="post">
            {post.photo && (
            <img className="postImg" src={PF+post.photo}></img>)}
            <div className="postInfo">
                {/* <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div> */}
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle" style={{color: "black"}}>{post.title}</span>
                </Link>     
                <span className="postDate">{post.username}, {new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    )
}

export default Post