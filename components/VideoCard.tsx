import { useState, useEffect, useRef } from "react"
import Image from "next/image";
import Link from "next/link";
import { Video } from "types"
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';




interface IProps {
  post: Video
}

export default function VideoCard({
  post
}: IProps) {

  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div>
          <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
            <div className="w-10 h-10 md:w-16 md:h-16">
              <Link href="/">
                <>
                  <Image
                    width={62}
                    height={62}
                    src={post.postedBy.image}
                    alt="profile image"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href="/">
                <div className='flex items-center gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post.postedBy.userName} {` `}  <GoVerified className="text-blue-400 text-md" /></p>
                  <p className="hidden md:block capitalize font-medium text-xs text-gray-500">
                    {
                      post.postedBy.userName
                    }
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className='lg:ml-20 flex gap-4 relative'>
          <div className="rounded-3xl"
            onMouseEnter={() => {
              setIsHover(true)
            }}
            onMouseLeave={() => {
              setIsHover(false)
            }}
          >
            <Link href={`/`}>
              <video
                ref={videoRef}
                loop
                className="lg:w-[600px] lg:h-[530px] md:h-[400px] h-[300px] w-[200px] bg-gray-100 rounded-2xl cursor-pointer"
              >
                <source type="video/mp4" src={post.video.asset.url}></source>
              </video>
            </Link>

            {
              isHover && (
                <div className='absolute bottom-6 left-10 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3 cursor-pointer'>
                  {
                    playing ? <button onClick={onVideoPress}>
                      <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                    </button> : <button onClick={onVideoPress}>
                      <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                    </button>
                  }
                  {
                    isMuted ? (
                      <button>
                        <HiVolumeOff className='text-black text-2xl lg:text-4xl' onClick={() => setIsMuted(false)}/>
                      </button>) : (<button>
                        <HiVolumeUp className='text-black text-2xl lg:text-4xl' onClick={() => setIsMuted(true)} />
                      </button>
                    )
                  }
                </div>
              )
            }

          </div>
        </div>
      </div>
    </div>
  )
}
