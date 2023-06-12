const express = require("express");
const Post = require("../schemas/Posts")
const User = require("../schemas/Users")
const Comment = require("../schemas/Comments")

const router = express.Router();


// GET Routes

router.get("/view/:id", async (req, res) => {
    //dont need auth here
    let id = req.params.id;
    const post = await Post.findById(id)

    const user = await User.findById(post.user)

    console.log(user.username)
    let author = user.username
    console.log(req.user)
    if (req.user)
    {

        ownpost = author === req.user[0].username
    }
    else ownpost = false

    res.send({post, author, ownpost})
});

router.get("/comments/:post", async (req, res) =>
{
    let title = req.params.post;
    // find post
    const post = await Post.findOne({
        title
    })
    // find all comments
    const postComments = await Comment.find({post})
    res.send(postComments)
});

// POST Routes


router.post("/create", async (req, res) => {
    if (req.user)
    {
        const { title, text } = req.body
        let usersLiked = []
        let usersDisliked = []
        const user = await User.findOne({
            username: req.user[0].username,
          });
        console.log(user)
        
        const newPost = new Post({title, text, user, usersLiked, usersDisliked})
        await newPost.save();
        res.send({ msg: "CREATED POST!" });
    }
    else 
    {
        return res.status(401).send({ errorMsg:  "Try logging in first!"});
    }
});

// Create comment on post
router.post("/comment/:post", async (req, res) =>
{
    if (req.user)
    {
        const { text } = req.body
        let title = req.params.post;
        // find post
        const post = await Post.findOne({
            title
        })

        const user = await User.findOne({
            username: req.user[0].username,
          });
        
        const newComment = new Comment({text, user, post})
        await newPost.save();
        res.send({ msg: "CREATED POST!" });
    }
    else 
    {
        res.send({ msg: "NOT LOGGED IN" });
        const user = await User.findOne({
            username: req.body.info.username,
        });
        const post = await Post.findOne({
            title
        })
    }
});

// Like or Dislike Post
router.post("/like", async (req, res) => {
    if (req.user)
    {
        const { title } = req.body
        const user = await User.findOne({
            username: req.user[0].username,
        });
        const post = await Post.findOne({
            title
        })
        post.usersLiked.forEach((u, i) =>{
            if (u == user)
            {
                usersLiked = post.usersLiked
                usersLiked.splice(i, 1)
                Post.findOneAndUpdate({title}, {usersLiked})
                res.send({msg: "LIKED"})
            }
        })
        usersLiked = post.usersLiked
        usersLiked.push(user)
        Post.findOneAndUpdate({title}, {usersLiked})
    }
});

router.post("/dislike", async (req, res) => {
    if (req.user)
    {
        const { title } = req.body
        const user = await User.findOne({
            username: req.user[0].username,
        });
        const post = await Post.findOne({
            title
        })
        post.usersDisliked.forEach((u, i) =>{
            if (u == user)
            {
                usersLiked = post.usersDisliked
                usersLiked.splice(i, 1)
                Post.findOneAndUpdate({title}, {usersLiked})
                res.send({msg: "LIKED"})
            }
        })
        usersLiked = post.usersDisliked
        usersLiked.push(user)
        Post.findOneAndUpdate({title}, {usersLiked})
    }

});

// Delete post
router.delete("/delete", async (req, res) => {
    if (req.user)
    {
        const { id } = req.body
        const user = await User.findOne({
            username: req.user[0].username,
        });
        const post = await Post.findById(
            id
        )
        // check if user made post
        if (req.user)
        {
            await Post.findByIdAndDelete(id)
            res.redirect('/feed')
        }
        else
        {
            res.send({msg: "USER DID NOT CREATE POST"})
        }
    }
    else
    {
        res.send({msg: "NOT LOGGED IN"})
    }
});

module.exports = router;