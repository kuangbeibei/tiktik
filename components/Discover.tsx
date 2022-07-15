import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "Constants/topics";

const Discover = () => {
  const router = useRouter();
  const {topic} = router.query;

  const activeTopStyle = `flex justify-center items-center space-x-2 space-y-2 xl:border-2 hover:bg-primary border-[#f51997] px-3 py-2 rounded xl:rounded-full text-[#ff1997] cursor-pointer`;
  const TopicStyle = `flex justify-center items-center space-x-2 space-y-2 xl:border-2 hover:bg-primary border-gray-300 px-3 py-2 rounded xl:rounded-full text-black cursor-pointer`;

	return (
		<div className="xl:border-b-2 border-gray-200 pb-6">
			<p className="hidden xl:block text-gray-500 font-semibold m-3 mt-4">
				Popular Topics
			</p>
			<div className="flex gap-3 flex-wrap">
				{topics.map((item) => (
					<Link key={item.name} href={`/?topic=${item.name}`}>
						<div className={ topic === item.name ? activeTopStyle : TopicStyle}>
							<span className="font-bold text-2xl xl:text-md">{item.icon}</span>
							<span className="hidden xl:block capitalize text-md font-medium">{item.name}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Discover;
