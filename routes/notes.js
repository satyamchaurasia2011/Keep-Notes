const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Note = mongoose.model("Note");
const requireLogin = require('../middleware/requireLogin');
router.post('/createnote', requireLogin, (req, res) => {
    const {title, body} = req.body;
    if(!title || !body){
        return res.status(422).json({error:"please add all fields.."});
    }
    req.user.password = undefined;
    const note = new Note({
        title : title,
        body : body,
        postedBy : req.user
    });
    note.save()
    .then(result => {
        res.json({note : result})
    })
    .catch(err => {
        console.log(err);
    })
});

router.get('/notes', requireLogin, (req,res) => {
    Note.find({postedBy:req.user._id})
    .populate("postedBy", "_id, name")
    .sort('-createdAt')
    .then(notes => {
        res.json({notes : notes})
    })
    .catch(err => {
        console.log(err);
    })
})

router.delete('/deletenote/:noteId',requireLogin, (req,res) => {
    Note.findOne({_id : req.params.noteId})
    .populate('postedBy', '_id name')
    .exec((err, note) => {
        if(err || !note){
            return res.status(422).json({error:err})
        }
        note.remove()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err);
        })
    })
})


module.exports = router