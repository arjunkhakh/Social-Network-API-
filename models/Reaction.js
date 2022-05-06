const { Schema } = require('mongoose');

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
            get: (createdAtVal) =>
            moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    },
    {
    toJSON: {
        getters: true,
    },
    },
);

module.exports = reactionSchema;
