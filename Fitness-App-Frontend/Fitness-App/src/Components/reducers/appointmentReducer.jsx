
let init = {
    showUpdate: false,
    hospitalName: "",
    appointmentDate: "",
    appointmentTiming: "",
    status: "",
    _id:""
    
}

let AppointmentUpdateReducer = (state = init, action) => {

    
  switch (action.type) {
      case "onChange":  
          let { key, value } = action.payload;
        
          return { ...state, [key]: value }
      case "setShowUpdate":
          return { ...state, showUpdate: action.payload };
      case "currentRow":
          return action.payload;
    default:
      return state;
  }
};

export { AppointmentUpdateReducer };
