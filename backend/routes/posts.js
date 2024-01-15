const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(`post : ${post}`);
    // console.log(post.username);
    // console.log(req.body.username)
    if (post.username === req.body.username) {
      try {
        await Post.deleteOne({ _id: post._id });
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    // console.log("Failed while deleteing");
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.put("/:id/like", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const post = await Post.findById(postId);

//     // Increment the like count
//     const updatedLikes = (post.like || 0) + 1;

//     // Update the post with the new like count
//     const updatedPost = await Post.findByIdAndUpdate(
//       postId,
//       { like: updatedLikes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put("/:id/like", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     console.log(postId);
//     const userId = req.user._id; // Assuming you have authentication middleware setting req.user
//     console.log(userId)

//     // Check if the user has already liked the post
//     const post = await Post.findById(postId);
//     if (post.likes.includes(userId)) {
//       return res.status(400).json({ error: "User already liked this post" });
//     }

//     // Add user to the likes array in the post
//     post.likes.push(userId);
//     await post.save();

//     // Add the liked post to the user's likedPosts array
//     const user = await User.findById(userId);
//     user.likedPosts.push(postId);
//     await user.save();

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error updating like:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });

// // Get like count
// router.get("/:id/likes", async (req, res) => {
//   try {
//     const postId = req.params.id;

//     // Fetch the post and return the like count
//     const post = await Post.findById(postId);
//     const likes = post ? post.like || 0 : 0;

//     res.json({ likes });
//   } catch (error) {
//     console.error('Error fetching likes:', error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// });


module.exports = router;