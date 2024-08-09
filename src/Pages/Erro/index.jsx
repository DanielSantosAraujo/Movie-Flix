import { Link } from "react-router-dom"

export default function Erro(){
    return(
        <div className="flex items-center justify-center flex-col w-full h-[calc(100vh_-_60px)]">
            <h1 className="text-[120px]">404</h1>
            <h2 className="text-2xl">Pagina não encontrada</h2>
            <Link to="/" className="no-underline bg-[#116feb] text-white p-[10px] mt-[14px]">Veja todos os filmes!</Link>
        </div>
    )
}