import axios from "axios"
import decode from "jwt-decode"

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
    console.log('picture', picture);

}

export const postVideo = async (data: any) => {
    await axios.post(`http://localhost:3000/api/post`, data);
}