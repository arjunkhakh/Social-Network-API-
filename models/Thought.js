const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            maxlength: 280,
            minlength: 1,
            default: Date.now,
        },
        createdAt: {
            type: String,
            required: true,
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

userSchema
.virtual('reactionCount')
.get(function () {
    return reactions;
})
.set(function () {
    this.set({ reactions });
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
