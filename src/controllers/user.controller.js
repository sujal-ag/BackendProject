import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res) => {
    // Step 1 - get user details from frontend
    // Step 2 - validation - not empty
    // Step 3 - check if user already exist: using username, email
    // Step 4 - check for images, check for avatar
    // Step 5 - upload them to cloudinary, avatar check kro hai ki nhi
    // Step 6 - create user object - create entry in db
    // Step 7 - remove password and refresh token field from response
    // Step 8 - check for user creation
    // Step 9 - return response

    const {fullName, username, email, password} = req.body
    console.log("email: ",email);

    // if(fullName === ""){
    //     throw new ApiError(400, "Full Name is required")
    // }

    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log(avatar);
    
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar upload failed")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )


} )

export {registerUser}