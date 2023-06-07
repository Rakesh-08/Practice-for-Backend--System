module.exports.passwordLessUser = (arr) => {
    
    let responseObject = [];

    for (let i = 0; i < arr.length; i++){
        
        let temp = {
            _id: arr[i]._id,
            firstName:arr[i].firstName,
            lastName:arr[i].lastName,
            email:arr[i].email,
            role:arr[i].role,
            createdAt:arr[i].createdAt,
            updatedAt:arr[i].updatedAt
        }

        responseObject.push(temp)
    }

    return responseObject;

}

module.exports.applicantsLessJobs = (arr) => {

    let responseObject = [];

    for (let i = 0; i < arr.length; i++) {

        let temp = {
            _id: arr[i]._id,
            firstName: arr[i].firstName,
            lastName: arr[i].lastName,
            email: arr[i].email,
            role: arr[i].role,
            createdAt: arr[i].createdAt,
            updatedAt: arr[i].updatedAt
        }

        responseObject.push(temp)
    }

    return responseObject;
}



