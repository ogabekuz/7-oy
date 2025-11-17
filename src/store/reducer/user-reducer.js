import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: [],
  count: 0,
};

const user = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const isAvailable = state.userList.find(
        (item) => item?.userName === action?.payload.userName
      );
      if (!isAvailable) {
        return {
          ...state,
          count: state.count + 1,
          userList: [...state.userList, action.payload],
        };
      }
      return state;
    },

    getUserList: (state) => {
      return state.userList;
    },

    updateUser: (state, action) => {
      const userIndex = state.userList.findIndex(
        (item) => item?.id === action?.payload.id
      );
      if (userIndex !== -1) {
        state.userList[userIndex] = {
          ...state.userList[userIndex],
          ...action.payload,
        };
      }
      return state;
    },

    deleteUser: (state, action) => {
      state.userList = state.userList.filter(item => item.id !== action.payload);
      state.count = state.userList.length;
      return state;
    },

    deleteAllUsers: (state) => {
      return {
        ...state,
        userList: [],
        count: 0,
      };
    },
  },
});

export default user.reducer;
export const { addUser, updateUser, deleteUser, deleteAllUsers, getUserList } =
  user.actions;