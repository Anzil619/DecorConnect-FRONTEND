
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userinfo : {},
    FirmInfo : {},
    address : {},
    verification : {},
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

        }
    }

})

export const { setAddress, setFirmInfo, setVerification,setUserInfo} = ProfessionalSlice.actions;
export default ProfessionalSlice.reducer;