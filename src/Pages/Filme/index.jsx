import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import api from "../../services/api";

export default function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setloading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "54a8851661c0e6de4a82ed4cb7c34493",
                    language: "pt-BR" 
                }
            })
            .then((response) => {
                setFilme(response.data); 
                setloading(false) 
            })
            .catch(() => {
                // console.log("FILME NAO ENCONTRADO");   
                navigate("/", {replace: true})
                return;    
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO!");
            
        }
    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@movieFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFIlme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id);

        if(hasFIlme){
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@movieFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");
    }

    if(loading){
        <div className="">
            <h1>Carregando detalhes...</h1>
        </div>
    }

    return(
        <div className=" flex flex-col max-w-[800px] py-0 px-2 my-0 mx-auto">
           <h1 className="text-2xl font-bold my-[14px] mx-0">{filme.title}</h1>
           <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} className="w-[800px] max-w-full max-h-[340px] object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-[14px]">Sinopse</h3>
            <span className="my-2 mx-0">{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="">
                <button onClick={salvarFilme}
                 className="mr-3 mt-[14px] ml-0 text-[20px] border-0 rounded-[4px] outline-none p-3 bg-gray-200 cursor-pointer hover:bg-yellow-900 hover:text-white duration-500">
                    Salvar
                    </button>
                <button className="mr-3 mt-[14px] ml-0 text-[20px] border-0 rounded-[4px] outline-none p-3 bg-gray-200 cursor-pointer hover:bg-yellow-900 hover:text-white duration-500">
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>
    )
}