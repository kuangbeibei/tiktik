import React, { useState, useEffect, useRef } from "react"
import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { GoVerified } from 'react-icons/go';
import { getVideoDetail, putLikeAction } from "services"
import { Video as IVideo } from "types"
import useAuthStore from "store/authStore"
import { LikeButton, Comments } from "Comps"


interface IProps {
    postDetails: IVideo;
}

const Detail: NextPage<IProps> = ({ postDetails }) => {

    const router = useRouter()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const { userProfile } = useAuthStore()
    const [post, setPost] = useState(postDetails);
    const [comment, setComment] = useState<string>('');
    const [isPostingComment, setIsPostingComment] = useState(false)

    useEffect(() => {
        if (post && videoRef?.current) {
            videoRef.current.muted = isMuted;
        }
    }, [post, isMuted]);

    const onVideoClick = () => {
        if (playing) {
            videoRef?.current?.pause()
            setPlaying(false)
        } else {
            videoRef?.current?.play()
            setPlaying(true)
        }
    }

    const addComment = (e: React.FormEvent) => {

    }

    const handleLike = async (like: boolean) => {
        const data = await putLikeAction(userProfile?._id!, post._id, like);
        setPost({
            ...postDetails,
            likes: data.likes
        })
    }


    if (!post) return null

    return (
        <>
            {post && (
                <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
                    <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
                        <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
                            <p className='cursor-pointer ' onClick={() => router.back()}>
                                <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
                            </p>
                        </div>
                        <div className='relative'>
                            <div className='lg:h-[100vh] h-[60vh]'>
                                <video
                                    ref={videoRef}
                                    onClick={onVideoClick}
                                    loop
                                    src={post?.video?.asset.url}
                                    className=' h-full cursor-pointer'
                                ></video>
                            </div>

                            <div className='absolute top-[45%] left-[40%]  cursor-pointer'>
                                {!playing && (
                                    <button onClick={onVideoClick}>
                                        <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10  cursor-pointer'>
                            {isMuted ? (
                                <button onClick={() => setIsMuted(false)}>
                                    <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
                                </button>
                            ) : (
                                <button onClick={() => setIsMuted(true)}>
                                    <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
                        <div className='lg:mt-20 mt-10'>
                            <Link href={`/profile/${post.postedBy._id}`}>
                                <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
                                    <Image
                                        width={60}
                                        height={60}
                                        alt='user-profile'
                                        className='rounded-full'
                                        src={post.postedBy.image}
                                    />
                                    <div>
                                        <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                                            {post.postedBy.userName.replace(/\s+/g, '')}{' '}
                                            <GoVerified className='text-blue-400 text-xl' />
                                        </div>
                                        <p className='text-md text-gray-500'> {post.postedBy.userName}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className='px-10'>
                                <p className=' text-md text-gray-600'>{post.caption}</p>
                            </div>
                            <div className='mt-10 px-10'>
                                {userProfile && <LikeButton
                                    likes={post.likes}
                                    flex='flex'
                                    handleLike={() => handleLike(true)}
                                    handleDislike={() => handleLike(false)}
                                />}
                            </div>
                            <Comments
                                comment={comment}
                                setComment={setComment}
                                addComment={addComment}
                                comments={post.comments}
                                isPostingComment={isPostingComment}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Detail

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await getVideoDetail(context.params?.id!);

    return {
        props: {
            postDetails: data
        }
    }
}