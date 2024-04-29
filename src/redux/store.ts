import { configureStore } from "@reduxjs/toolkit";
import userListSlice  from "./slices/userlist";
import idCounterSlice from "./slices/counter";

export const store = configureStore({
    reducer: {
        userList: userListSlice,
        idCounter: idCounterSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;