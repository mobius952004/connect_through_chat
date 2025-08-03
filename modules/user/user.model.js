import mongoose from "mongoose";

const userSchema = new mongoose.Schema(

    {
        username: { 
            type: String, 
            required: true, 
            unique: true },

        email: {
            type:String, unique: true,
    //   lowercase: true,
    //         trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "", // URL to profile image if needed
        },
        status: {
            type: String,
            default: "Hey there! I'm using Flash ",
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;





