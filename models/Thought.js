// Acquiring Mongoose and The Reaction Schema for the model
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Thought Schema Model
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

// Thought Schema Virtual for getting reactions array length
thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
})
.set(function () {
    this.set({ reactions });
})

// Creating the Model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
