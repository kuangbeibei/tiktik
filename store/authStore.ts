import axios from "axios";
import { IUser } from "types";
import create from "zustand"
import {persist} from "zustand/middleware"


const authStore = (set: any) => ({
    userProfile: null as (IUser | null) ,
    
    addUser: (user: any) => set({
        userProfile: user
    }),
    removeUser: () => set({
        userProfile: null
    })
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;