const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { ObjectId } = require('mongodb');



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


router.put("/:id/like", authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const username = req.username;
    const user = await User.findOne({ username });
    const userId = new ObjectId(user._id);
    const currentPostId = new ObjectId(postId);

    // Check if the user has already liked the post
    const post = await Post.findById(postId);
    if (post.likes.includes(user._id)) {


      post.likes = post.likes.filter(likeId => likeId.toString() !== userId.toString());

      post.like=post.like-1;

    // Save the post with updated likes array
      await post.save();
      user.likedPosts = user.likedPosts.filter(currentPost => currentPost.toString() !== currentPostId.toString())
      await user.save();

    }
    else
    {

      // Add user to the likes array in the post
      post.likes.push(user._id);
      post.like=post.like+1;
      await post.save();

      // Add the liked post to the user's likedPosts array
      user.likedPosts.push(postId);
      await user.save();
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Get like count
router.get("/:id/likes", async (req, res) => {
  try {
    const postId = req.params.id;

    // Fetch the post and return the like count
    const post = await Post.findById(postId);
    const likes = post ? post.like || 0 : 0;

    res.json({ likes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

//check whether post already contain user
router.get("/:userId/:postId", async (req, res) => {
  try{

    const postId = req.params.postId;
    const userId = req.params.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user ID exists in the likes array
    const isLiked = post.likes.includes(userId);

    res.json({ isLiked });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;