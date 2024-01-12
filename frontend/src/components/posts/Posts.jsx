import Post from "../post/Post"
import "./posts.css"

function Posts({posts}) {
  // console.log('Posts component');
  // console.log(posts);
  return (
    <div className='posts'>
      {posts.map((p) => (
        <Post post={p}/>
      ))}
      
    </div>
  )
}

export default Posts