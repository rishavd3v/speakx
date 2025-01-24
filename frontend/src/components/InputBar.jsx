export default function InputBar({ setQuery }) {
    
    function handleQuery(e){
        setQuery(e.target.value);
    }

    return(
        <input onChange={handleQuery} className="rounded-md px-20 pl-1 py-2 border-black border-2" type="text" placeholder="Enter query..."/>
    )
}