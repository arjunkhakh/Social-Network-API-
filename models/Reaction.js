const { Schema } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: String,
            required: true,
        },
        reactionBody: {
            type: Date,
            maxlength: 280,
            minlength: 1,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt:{ 
            type: Date,
            default: Date.now,
            // create getter method
        },
    },
    {
    toJSON: {
        getters: true,
    },
    },
);