import mongoose from "mongoose";

const blacklistSchema = mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    }
},{
    timestamps:true
})

export const Blacklist = mongoose.model("Blacklist",blacklistSchema)

