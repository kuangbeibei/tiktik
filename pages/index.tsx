import type { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import { Video } from "types";
import { VideoCard, NoResults } from "Comps";
import { getAllPosts } from "services";

interface IProps {
	videos: Array<Video>;
}

const Home: NextPage<IProps> = ({ videos }) => {
	return (
		<div className="h-full flex flex-col gap-10 videos">
			{videos && videos.length ? (
				videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
			) : (
				<NoResults text={"No Videos"} />
			)}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const { data } = await getAllPosts();

	console.log("home getServerSideProps");

	return {
		props: {
			videos: data,
		},
	};
};

export default Home;
