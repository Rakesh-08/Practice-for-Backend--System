
let init = {
    showUpdate: false,
    hospitalName: "",
    appointmentDate: "",
    appointmentTiming: "",
    status:""
    
}

let AppointmentUpdateReducer = (state = init, action) => {
  switch (action.type) {
      case "onChange":
          let { key, value } = action.paload;
          return { ...state, [key]: value }
      case "setShowUpdate":
          return{ ...state,showUpdate:action.payload}
    default:
      return state;
  }
};

export { AppointmentUpdateReducer };
