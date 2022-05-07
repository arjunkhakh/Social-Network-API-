// Acquiring Mongoose for the Schema
const { Schema } = require('mongoose');

// Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: String,
            required: true,
        },
        reactionBody: {
            type: String,
            maxlength: 280,
            minlength: 1,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
            ref: "user",
          },
        createdAt:{ 
            type: Date,
            default: Date.now,
        },
    },
    {
    toJSON: {
        getters: true,
    },
    },
);


module.exports = reactionSchema;
