import { createSlice } from "@reduxjs/toolkit";

interface payloadProp {
    id: number;
    firstName: string;
    lastName: string;
    status: string;
}

interface userListProp {
    type: string;
    payload: payloadProp;
}


export const userListSlice = createSlice({
    initialState: [] as payloadProp[],
    name: "userList",
    reducers: {
        addUser: (state, val: userListProp) => [...state, val.payload],

        updateUser: (state, val: userListProp) => {
            const {id, firstName, lastName, status}  = val.payload;
            state.forEach((element) => {
                if( element.id === id ) {
                    element.firstName = firstName;
                    element.lastName = lastName;
                    element.status = status;
                }
            })
        },

        deleteUser: (state, val) => {
            const id = val.payload;
            const arr = state;
            arr.forEach((element, index) => {
                if( element.id === id ) {
                    state.splice(index, 1);
                }
            });
        }
    }
});

export const {addUser, updateUser, deleteUser} = userListSlice.actions;
export default userListSlice.reducer;