// Acquiring The Mongoose Package for the Model
const { Schema, model } = require('mongoose');

// User Schema Model
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

// UserSchema Virtual for getting the friend array list of usernames
userSchema
.virtual('friendCount')
.get(function () {
    return `${this.username.length}`
})
.set(function () {
    this.set({ username })
})

// Creating the Model
const User = model('User', userSchema);

module.exports = User;
