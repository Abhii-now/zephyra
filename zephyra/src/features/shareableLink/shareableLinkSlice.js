import { createSlice } from "@reduxjs/toolkit";

const shareableLinkSlice = createSlice({
  name: "shareableLink",
  initialState: { link: "", showAlert: false },
  reducers: {
    setShareableLink: (state, action) => {
      state.link = action.payload;
    },
    setShowAlert: (state, action) => {
      state.showAlert = action.payload;
    },
  },
});

export const { setShareableLink, setShowAlert } = shareableLinkSlice.actions;
export default shareableLinkSlice.reducer;
