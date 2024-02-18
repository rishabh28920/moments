import "./post.css";
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import HeartOutline from "./HeartOutline";


function Post({ post }) {
    const PF = "http://localhost:5000/images/";
    const [likes, setLikes] = useState(post.like || 0); // Initialize likes with the existing value or 0
    const { user } = useContext(Context);

    const [isActive, setIsActive] = useState(false);

    function toggleHeart() {
        setIsActive(!isActive); // Toggle the isActive state
    }

    useEffect(() => {
        // Fetch the number of likes on page loading
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${post._id}/likes`);
                setLikes(response.data.likes);
                if(user)
                {
                    const isLiked = await axios.get(`http://localhost:5000/api/posts/${user._id}/${post._id}`);
                    if(isLiked.data.isLiked)
                    {
                        setIsActive(true);
                    }
                    else
                    {
                        setIsActive(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching likes:", error);
            }
        };

        fetchLikes();
    }, [post._id]);

    const handleLike = async () => {
        try {
            if (!user) {
                window.alert("Please login");
                return;
            }
    
            // Check if the user has already liked the post
            const isLiked = await axios.get(`http://localhost:5000/api/posts/${user._id}/${post._id}`);
            console.log(isLiked.data.isLiked);
            if(isLiked.data.isLiked)
            {
                setIsActive(false);
            }
            else
            {
                setIsActive(true);
            }
    
            // Update the likes count on the backend
            const response = await axios.put(`http://localhost:5000/api/posts/${post._id}/like`, { like: likes }, {
                withCredentials: true
            });
            // Update the likes count in the state
            setLikes(isLiked.data.isLiked ? likes - 1 : likes + 1);
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };
    


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

                    <HeartOutline
                        onClick={handleLike}
                        isActive={isActive}
                        color={'#00000'}
                        height="25px"
                        width="25px"
                    />
                    <span className="like-count">{likes}</span>
                </span>
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
    );
}

export default Post;