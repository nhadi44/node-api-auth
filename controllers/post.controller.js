const express = require('express')

exports.post = (req, res) => {
    res.json({
        posts: {
            title: 'My first post',
            description: 'random data you shoudnt access'
        }
    })
}