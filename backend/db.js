// backend/db.js
const mongoose = require('mongoose');
require('dotenv').config();

// Ensure dbname is set in URI
let uri = process.env.MONGODB_URI;
if (uri && !uri.includes('paytm')) {
  if (uri.endsWith('/')) {
    uri += 'paytm?retryWrites=true&w=majority&appName=Cluster0';
  } else if (uri.includes('?')) {
    uri = uri.replace('?', '/paytm?');
  } else {
    uri += '/paytm?retryWrites=true&w=majority&appName=Cluster0';
  }
}

mongoose.connect(uri);

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};