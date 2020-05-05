const express = require("express")
const router = express.Router()
const cors = require("cors")

const posts = require("../data/db")
const db = require("../data/db")


router.get('/', (req, res) => {
    posts
    .find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving the posts",
      });
    });
})

router.get('/:id', (req, res) => {
    posts
    .findById(req.params.id)
    .then((post) => {
        if (post === undefined) {
            res.status(404).json({ message: "The post with this ID does not exist"})
        }
        res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving this post",
      });
    });
})

router.get('/:id/comments', (req, res) => {
    db.
    findPostComments(req.params.id)
    .then((comment) => {
        if (comment === undefined) {
            res.status(404).json({ message: "The comment with this ID does not exist"})
        }
        res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error retrieving this post",
      });
    });
})

router.post("/", (req, res) => {
    const { title, contents } = req.body;
    console.log({ title, contents });

    if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      }
      posts
        .insert({ title, contents })
        .then((post) => res.status(201).json({ message: "Post created" }))
        .catch((err) =>
          res.status(500).json({
            error: "There was an error while saving the post to the database",
          })
        );
    });

    router.post("/:id/comments", (req, res) => {
        posts
            .findById(req.params.id)
            .then((post) => {
            if (post === undefined)
                res.status(404).json({
                message: "The post with the specified ID does not exist.",
                });

                if (!req.body.text) {
                    res.status(400)
                }

            db
                .insertComment({ post_id: req.params.id, text: req.body.text })
                .then((comment) => {
                res.status(201).json(comment);
                });
            })
            .catch((err) => res.status(500).json({ message: "There was an issue posting this comment"}));
        });

        router.delete("/:id", (req, res) => {
            posts
                .findById(req.params.id)
                .then((post) => {
                    if (post === undefined) {
                        res.status(404).json({
                            message: "The post with the specified ID does not exist.",
                        })
                    }
                })
                .catch((err) => { res.status(500).json({ message: "There was an error while deleting this post"})})

            db
                .remove(req.params.id)
                .then((post) => res.status(200).json(post))
                .catch((err) => {console.log(err)})
        })

        router.put("/:id", (req, res) => {
            //finds the specific post by id and checks if it exists
            posts
            .findById(req.params.id)
            .then((post) => {
                if (post === undefined) {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist.",
                    })
                }
            })

            //checks to see if body has title && contents
            const {title, contents} = req.body

            if (!title || !contents) {
                res.status(400).json({ message: "Missing information from the request body"})
            }

            //updates the post with content from the request body
            db
            .update(req.params.id, req.body)
            .then(() => {
                res.status(200).json({ message: "Post updated"})
            })
            .catch((err) => {
                res.status(500).json({ message: "There was an error while updating the post"})
            })
        })
            

module.exports = router;