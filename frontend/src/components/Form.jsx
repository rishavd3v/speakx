import Dropdown from "./Dropdown";
import InputBar from "./InputBar";

export default function Form({setQuery, setType}){
    

    

    return(
        <div className="">  
            <form action="">
                <div className="flex flex-col gap-4 font-medium justify-center">
                    <InputBar setQuery={setQuery}/>
                    <Dropdown setType={setType}/>

                    {/* <div className="">
                        <button className="hover:cursor-pointer bg-black w-max py-3 px-6 text-white rounded-md" onClick={handleSearch}>Search</button>
                    </div> */}

                </div>
            </form>


        </div>
    )
}