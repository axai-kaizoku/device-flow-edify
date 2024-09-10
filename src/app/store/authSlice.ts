import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserData = {
	token: string;
	userId: string;
	email: string;
};

interface AuthState {
	isAuthenticated: boolean;
	userData: UserData | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	userData: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action: PayloadAction<{ userData: UserData }>) {
			state.isAuthenticated = true;
			state.userData = action.payload.userData;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.userData = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
