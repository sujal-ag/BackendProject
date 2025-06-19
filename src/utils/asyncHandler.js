// const asyncHandler = (requestHandler) => {
//     return (req, res, next) => {
//         Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err)).
//         catch((err) => next(err))
//     }
// }

// export {asyncHandler}


//{TRY CATCH METHOD}

// const asyncHandler = () => {}
// const asyncHandler = (fn) => {return () => {}}
// const asyncHandler = (fn) => {} //we can remove the curly braces

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export {asyncHandler}