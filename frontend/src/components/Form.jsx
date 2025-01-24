import axios from "axios";
import Dropdown from "./Dropdown";
import InputBar from "./InputBar";
import { useState } from "react";

export default function Form({setQuestions}){
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [page, setPage] = useState(1);


    async function handleSearch(e){
        //search function
        e.preventDefault();

        const data = await axios.get('http://localhost:3000/api/questions',{
            params: {
                query,
                type,
                page
            }
        })
        
        setQuestions(data.data);
    }

    return(
        <div className="">  
            <form action="">
                <div className="flex flex-col gap-4 font-medium justify-center">
                    <InputBar setQuery={setQuery}/>
                    <Dropdown setType={setType}/>

                    <div className="">
                        <button className="hover:cursor-pointer bg-black w-max py-3 px-6 text-white rounded-md" onClick={handleSearch}>Search</button>
                    </div>

                </div>
            </form>


        </div>
    )
}