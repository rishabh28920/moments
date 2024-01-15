import "./post.css";
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";

function Post({ post }) {
    const PF = "https://moments-backend-one.vercel.app//images/";
    const [likes, setLikes] = useState(post.like || 0); // Initialize likes with the existing value or 0
    const { user } = useContext(Context);

    // useEffect(() => {
    //     // Fetch the number of likes on page loading
    //     const fetchLikes = async () => {
    //         try {
    //             const response = await axios.get(`https://moments-backend-one.vercel.app/api/posts/${post._id}/likes`);
    //             setLikes(response.data.likes);
    //         } catch (error) {
    //             console.error("Error fetching likes:", error);
    //         }
    //     };

    //     fetchLikes();
    // }, [post._id]);

    // const handleLike = async () => {
    //     try {
    //         // Increment the count by 1
    //         const newLikes = likes + 1;

    //         if(user==null)
    //         {
    //             console.log("please login");
    //             return;
    //         }

    //         if (post.likes.includes(user._id)) {
    //             console.log("You already liked this post");
    //             return;
    //           }

    //         // Update the database with the new like count
    //         await axios.put(`https://moments-backend-one.vercel.app/api/posts/${post._id}/like`, { like: newLikes });

    //         // Update the state to reflect the new like count
    //         setLikes(newLikes);
    //     } catch (error) {
    //         console.error("Error updating like:", error);
    //     }
    // };

    return (
        <div className="post">
            {post.photo && (
                <img className="postImg" src={PF + post.photo} alt="Post" />
            )}
            <div className="postInfo">
                {/* <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div> */}
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle" style={{ color: "black" }}>
                        {post.title}
                    </span>
                </Link>
                <span className="postDate">
                    {post.username}, {new Date(post.createdAt).toDateString()}
                </span>
                {/* <span>
                    <button onClick={handleLike}>Like</button>
                    {likes}
                </span> */}
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
    );
}

export default Post;
