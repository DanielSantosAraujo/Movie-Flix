import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header className="flex items-center justify-around w-full h-[60px] bg-black">
            <Link  to="/" className="no-underline text-3xl cursor-pointer text-white font-bold">Movie FLix</Link>
            <Link to="/favoritos" className="no-underline cursor-pointer bg-white py-[5px] px-[14px] text-black border rounded">Meus filmes</Link>
        </header>
    )
}