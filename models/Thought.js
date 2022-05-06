const { Schema, model } = require('mongoose');
const moment = require("moment");
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            maxlength: 280,
            minlength: 1,
            default: Date.now,
            // get: (createdAtVal) =>
            // moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
            ref: "user",
          },
        reactions: [reactionSchema],
    },
    {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    },
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
})
.set(function () {
    this.set({ reactions });
})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
