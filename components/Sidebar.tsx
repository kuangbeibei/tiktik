import { useState } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import {Discover, SuggestedAccounts, Footer} from "./index";

export default function Sidebar() {
	const [showSidebar, setShowSidebar] = useState(true)
	
	const normalLink = `flex justify-center xl:justify-start items-center gap-3 hover:bg-primary p-3 semi-bold text-tikcolor rounded cursor-pointer `

	return <div>
		<div className="block md:hidden m-2 ml-4 mt-3 text-xl cursor-pointer" onClick={() => setShowSidebar(prev => !prev)}>
			{
				showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />
			}
		</div>

		{
			showSidebar && (
				<div className="xl:w-400 w-20 p-3 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0">
					<div className="xl:border-b-2 border-gray-200 xl:pb-4">
						<Link href="/">
							<div className={normalLink}>
								<p className="text-2xl">
									<AiFillHome />
								</p>
								<span className="hidden xl:block text-xl">For You</span>
							</div>
						</Link>
					</div>

					<Discover />
					<SuggestedAccounts />
					<Footer />
				</div>
			)
		}
	</div>;
}
