import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js';
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSidebarVisible: true,

    setSidebarVisible: (val) => set({isSidebarVisible: val}),

    getUsers: async() => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get('/api/message/users');
            set({users: res.data.users});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async(senderId) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/api/message/${senderId}`);
            set({messages: res.data.messages});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async(data) => {
        try {
            const { selectedUser, messages } = get();
            const res = await axiosInstance.post(`/api/message/send/${selectedUser._id}`, data);
            set({ messages:[...messages, res.data.newMsg]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on('message', (newMessage)=> {
            if(newMessage.senderId !== selectedUser._id) return;
            set({ messages: [...get().messages, newMessage]});
        });
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('message');
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));