

let HospitalListReducer = (state = [], action) => {
    switch (action.type) {
        
        case "setList":
            return action.payload;
        default:
            return state;
    }
}

export {HospitalListReducer}