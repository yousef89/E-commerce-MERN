import NavBarIcon from "../SVGs/NavBarIcon";

export default function NavBar(){
    return(
        <div className="w-[100%] bg-blue-500 flex shadow-xl items-center">
            <div className="flex items-center ml-6 py-2 gap-x-4">
                <NavBarIcon className="size-10"></NavBarIcon>
                <div className="text-xl font-mono">Tech Hub</div>
            </div>

            <div className="bg-black w-12 h-12 rounded-full ml-auto mr-5"></div>
        </div>
    )
}