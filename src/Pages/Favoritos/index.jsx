import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@movieFlix");
        setFilmes(JSON.parse(minhaLista) || [])
    } , [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@movieFlix", JSON.stringify(filtroFilmes));
        toast.success("Filme removido com sucesso!");
    }

    return(
        <div className="mt-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-[14px]">Meus filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

            <ul className="w-[720px]">
                {filmes.map((item) => {
                    return (
                        <li className="flex justify-between items-center mb-[14px]" key={item.div}>
                            <span className="text-lg">{item.title}</span>
                            <div className="flex justify-center items-center">
                                <Link to={`/filme/${item.id}`} className="no-underline text-[#116feb] mr-[14px]">Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}