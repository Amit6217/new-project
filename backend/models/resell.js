const mongoose = require('mongoose');

const resellSchema = new mongoose.Schema({
name: {
        type: String,
        required: [true, 'Project name is required'],
        trim: true,
        maxlength: [100, 'Project name cannot be more than 100 characters']
    },   
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxlength: [1000, 'Project description cannot be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    phone:{
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        length: [10, 'Phone number must be 10 digits'],
        match: [/^\d{10}$/, 'Phone number must be a valid 10-digit number']
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return v === '' || /^https?:\/\/.+/.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    category: {
        type: String,
        default: 'resell',
        enum: ['ourProduct', 'bookRental', 'resell'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports= mongoose.model("resell", resellSchema);