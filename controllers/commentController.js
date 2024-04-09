// controllers/commentController.js
const Comment = require('../models/comment');

// create a new comment
exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create comment', error: error.message });
  }
};

// get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (comments.length === 0) {
      res.status(200).json({ message: 'No comments found' });
    } else {
      res.status(200).json({ message: 'Comments retrieved successfully', comments: comments });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comments', error: error.message });
  }
};

// single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment retrieved successfully', comment: comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comment', error: error.message });
  }
};

// update a comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment updated successfully', comment: comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error: error.message });
  }
};

// delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
};

