
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userinfo : {},
    FirmInfo : {},
    address : {},
    verification : {},
    user_address : {},
    userpost : [],
}


const ProfessionalSlice = createSlice({
    name : "professional",
    initialState,
    reducers : {

        setAddress : (state, action) =>{
            state.address = action.payload.address;
        },
        setFirmInfo : (state, action) =>{
            state.FirmInfo = action.payload.firminfo;
        },
        setVerification : (state, action) =>{
            state.verification = action.payload.verification;
        },
        setUserInfo : (state, action) =>{
            state.userinfo = action.payload.userinfo
        },
        setupdateInfo: (state, action) => {
            // Merge the updated data into the userinfo object
            state.userinfo = {
              ...state.userinfo, // Preserve existing userinfo data
              ...action.payload.updatedData.userinfo, // Update with new data
            };
          },
        setUserAddress : (state, action) =>{
            state.user_address = action.payload.user_address;
        },
        setUserPost: (state, action) => {
            state.userpost.push(action.payload);
          },
    }
})

export const { setAddress, setFirmInfo, setVerification,setUserInfo,setupdateInfo,setUserAddress,setUserPost} = ProfessionalSlice.actions;
export default ProfessionalSlice.reducer;