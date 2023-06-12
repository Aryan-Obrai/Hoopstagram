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
    let id = req.params.post;
    // find post
    const post = await Post.findById(
        id
    )
    // find all comments
    const postComments = await Comment.find({post})
    let u = postComments.user
    const author = await User.findById(u)
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
        let likes = 0
        
        const newPost = new Post({title, text, user, usersLiked, usersDisliked, likes})
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
        let id = req.params.post;
        let username = req.user[0].username
        console.log(text)
        // find post
        const post = await Post.findById(
            id
        )
        console.log(post)

        const user = await User.findOne({
            username
          });
        console.log(text)
        console.log(user)
        console.log(post)
        const newComment = new Comment({text, username, user, post})
        await newComment.save();
        res.send({ msg: "CREATED POST!" });
    }
    else 
    {
        res.send({ msg: "NOT LOGGED IN" });
    }
});

// Like or Dislike Post
router.post("/like", async (req, res) => {
    if (req.user)
    {
        let f = false
        const { id } = req.body
        const user = await User.findOne({
            username: req.user[0].username,
        });
        const post = await Post.findById(id)
        usersLiked = post.usersLiked
        usersLiked.forEach((u, i) =>{
            console.log(u.id)
            if (u.id == user.id)
            {
                usersLiked = post.usersLiked
                usersLiked.splice(i, 1)
                likes = post.likes
                likes = likes - 1;
                f = true
            }
        })

        if (!f)
        {
            likes = post.likes
            likes = likes + 1;
            usersLiked.push(user)
        }

        await Post.findByIdAndUpdate(id, {usersLiked, likes})
        console.log(post)
        res.send({msg: "LIKED"})
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
        if (post.usersDisliked)
        {
            post.usersDisliked.forEach((u, i) =>{
                if (u == user)
                {
                    usersDisliked = post.usersDisliked
                    usersDisliked.splice(i, 1)
                    likes = post.likes
                    likes = likes + 1;
                    Post.findOneAndUpdate({title}, {usersDisliked})
                    Post.findOneAndUpdate({title}, {likes})
                    res.send({msg: "LIKED"})
                }
            })
        }
        usersDisliked = post.usersDisliked
        likes = post.likes
        likes = likes - 1;
        usersDisliked.push(user)
        Post.findOneAndUpdate({title}, {usersDisliked})
        Post.findOneAndDelete({title}, {likes})

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