
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=>{
   
    // get user details from frontend
    // validation - check for empty
    // check if user already exist: username, email
    // check for image, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in database
    // remove password and refresh token field from response ( array with negative sign )
    // check for user creation 
    // return response

    const { fullName, email, username, password } = req.body        // we get data of user from frontend 
    if(
        [fullName,username,email,password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fiels are mandatory")
    }

    const existedUser = User.findOne({      // checking if any one of both already exist using ( $or ) operator
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,                       // already check above so no need to worry
        coverImage: coverImage?.url || "",         // need to check with ? ( optional sign )
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await user.findById(user._id).select(           // removing password and refreshtoken 
        "-password -refreshToken"
    )   

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating the user")        //checking for the user in db
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )





})

export {registerUser}