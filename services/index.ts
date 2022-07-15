import axios from "axios"
import decode from "jwt-decode"

export const getAllPosts = async () => {
    return await axios.get("http://localhost:3000/api/post")
}

export const createOrGetUser = async (response: any, addUser: any) => {
    const {
        name,
        sub,
        picture,
    }: {
        name: string
        sub: string
        picture: string
        email: string
    } = decode(response.credential);

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    }

    addUser(user)
    await axios.post(`http://localhost:3000/api/auth`, user);
}

export const postVideo = async (data: any) => {
    await axios.post(`http://localhost:3000/api/post`, data);
}

export const getVideoDetail = async (id: string | string[]) => {
    return await axios.get(`http://localhost:3000/api/post/${id}`)
}

export const putLikeAction = async (userId: string, postId: string, like: boolean) => {
    const {data} = await axios.put(`http://localhost:3000/api/post/`, {
        userId,
        postId,
        like
    })
    return data;
}

export const getProfileByUserId = async (userId: string) => {
    const {data} = await axios.get(`http:localhost:3000/api/profile/${userId}`);
    return data
}

export const getSearchResults = async (searchTerm: string) => {
    const {data} = await axios.get(`http://localhost:3000/api/search/${searchTerm}`);
    return data
}

export const getAllUsers = async () => {
    const {data} = await axios.get(`http://localhost:3000/api/users`)
    return data;
}