export interface Video {
    _id: string
    caption: string
    video: {
        asset: {
            _id: string
            url: string
        }
    }
    postedBy: {
        _id: string
        userName: string
        image: string
    }
    likes: Array<{
        postedBy: {
            _id: string
            userName: string
            image: string
        }
    }>
    comments: Array<{
        comment: string
        _key: string
        postedBy: {
            _id: string
            userName: string
            image: string
        }
    }>
    userId: string
}

export interface IUser {
    _id: string;
    _type: string;
    userName: string;
    image: string;
}

export interface IComment {
    comment: string;
    length?: number;
    _key: string;
    postedBy: { _ref?: string; _id?: string };
}