import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isRegistering: false,
    isLogging: false,
    isUpdatingProfile: false,
    isChecking: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get('/api/auth/check_auth');
            set({authUser: res.data.user});
            get().connectSocket();
        } catch (error) {
            set({authUser: null});
        } finally {
            set({isChecking: false});
        }
    },

    register: async(data) => {
        set({isRegistering: true});
        try {
            const res = await axiosInstance.post('/api/auth/register', data);
            set({authUser: res.data.user});
            toast.success(res.data.message);
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isRegistering: false})
        }
    },

    logout: async() => {
        try {
            const res = await axiosInstance.post('/api/auth/logout');
            set({authUser: null});
            toast.success(res.data.message);
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async(data) => {
        set({isLogging: true});
        try {
            const res = await axiosInstance.post("/api/auth/login", data);
            set({authUser: res.data.user});
            toast.success(res.data.message);
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isLogging: false});
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/api/auth/update_profile", data);
            console.log(res);
            toast.success("Profile updated successfully.");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: ()=> {
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            },
        });
        socket.connect();
        set({ socket: socket});
        socket.on('getOnlineUsers', (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: ()=> {
        if(get().socket?.connected) get().socket.disconnect();
    }
}))