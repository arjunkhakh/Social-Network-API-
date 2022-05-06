const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
        ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
        ],
        
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);


userSchema
.virtual('friendCount')
.get(function () {
    return `${this.username.length}`
})
.set(function () {
    this.set({ username })
})


const User = model('User', userSchema);

module.exports = User;
