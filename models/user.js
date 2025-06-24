const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@mnit\.ac\.in$/.test(v);
            },
            message: props => `${props.value} is not a valid MNIT email address!`
        },
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    department: {
        type: String,
        enum: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT', 'Others'],
        required: [true, 'Department is required']
    },
    year: {
        type: Number,
        min: [2015, 'Year must be between 2015 and 2025'],
        max: [2025, 'Year must be between 2015 and 2025']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;