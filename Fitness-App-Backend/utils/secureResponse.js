module.exports = (arr) => {
    let responseObject = [];

    for (let i = 0; i < arr.length; i++) {

        let temp = {
            _id: arr[i]._id,
            firstName: arr[i].firstName,
            lastName: arr[i].lastName,
            email: arr[i].email,
            phone: arr[i].phone,
            hospitalName: arr[i].hospitalName,
            hospitalEmail: arr[i].hospitalEmail,
            hospitalAddress: arr[i].hospitalAddress,
            hospitalPhone: arr[i].hospitalPhone,
            userId: arr[i].userId,
            accessToken: arr[i].accessToken,
            createdAt: arr[i].createdAt,
            updatedAt: arr[i].updatedAt
        }

        responseObject.push(temp)
    }
    if (responseObject.length == 1) {
        return responseObject[0]
    } else {
        return responseObject
    }

}