import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        firstName: {
            type: String,
            required: true,
            minlength: 2
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2
        },
        verification_code: {
            type: String,
            required: false
        },
        is_verified: {
            type: Boolean,
            required: true,
            default: false
        },
        is_active: {
            type: Boolean,
            required: true,
            default: true
        },
        role: {
            type: String,
            enum: ['SELLER', 'CUSTOMER'],
            default: 'CUSTOMER',
            required: true
        }
    },
    { timestamps: true }
);


const User = Mongoose.model('User', UserSchema);

export default User;
