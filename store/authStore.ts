import axios from "axios";
import { getAllUsers } from "services";
import { IUser } from "types";
import create from "zustand"
import {persist} from "zustand/middleware"


const authStore = (set: any) => ({
    userProfile: null as (IUser | null) ,
    allUsers: [],
    
    addUser: (user: any) => set({
        userProfile: user
    }),
    removeUser: () => set({
        userProfile: null
    }),
    fetchAllUsers: async () => {
        const data = await getAllUsers();
    
        set({ allUsers: data });
      },
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;