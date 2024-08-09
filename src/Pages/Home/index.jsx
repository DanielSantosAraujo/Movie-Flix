import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";
//URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR

export default function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get("/movie/now_playing", {
                params: {
                    api_key: "54a8851661c0e6de4a82ed4cb7c34493",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //  console.log(response.data);
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }

        loadFilmes();
    }, [])

    if(loading){
        return(
            <div className="mt-3">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div>
            <div className="max-w-[800px] my-[14px] mx-auto ">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id} className="w-full bg-white p-[15px]  rounded ">
                            <strong className="mb-[14px] flex items-center justify-center text-[22px]">{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} className="w-[900px] max-w-full max-h-[340px] object-cover rounded-t-[8px]" />
                            <Link to={`/filme/${filme.id}`} className="flex items-center justify-center py-[10px] px-0 text-2xl bg-[#116FEB] no-underline text-white rounded-b-[8px]">Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}