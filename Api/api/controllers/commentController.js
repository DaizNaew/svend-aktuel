'use strict';

var Comment = require('../models/commentModel');

exports.create_a_comment = function(req, res) {
    var new_comment = new Comment(req.body);

    if(!new_comment.comment) {
        res.status(400).send({
            error: true,
            message: 'Please supply a comment to add comment.'
        });
    } else {
        Comment.createComment(new_comment, (err, comment) => {
            if(err) res.send(err);
            res.json(comment);
        })
    }
}
exports.list_all_comments = (req, res) => {
    Comment.getAllComments((err, comments) => {
        if(err) res.send(err);
        res.json(comments)
    })
}

exports.read_a_comment = (req, res) => {
    let comment_id = req.params.commentId
    if(!comment_id) {
        return res.status(400).send({
            error: true, message: 'Venligst suppler et comment ID'
        })
    }
    Comment.getCommentById(comment_id, (err, comment) => {
        if(err) res.send(err);
        res.json(comment)
    })
}

exports.update_a_comment = (req, res) => {
    let comment_id = req.params.commentId,
        comment = req.body;
    if(!comment_id || !comment) {
        return res.status(400).send({
            error: true,
            Message: 'Venligst suppler bruger og bruger ID'
        })
    }
    Comment.updateById(comment_id, comment, (err, comment) => {
        if(err) res.send(err);
        res.json(comment)
    })
}

exports.delete_a_comment = (req, res) => {
    let comment_id = req.params.commentId;
    if(!comment_id) {
        res.status(400).send({
            error: true,
            message: 'Venligst suppler commentId på den bruger som skal slettes'
        })
    }
    Comment.deleteCommentById(comment_id, (err, comment) => {
        if(err) res.send(err);
        res.json(comment);
    })
}
