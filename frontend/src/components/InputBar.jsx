export default function InputBar({ setQuery }) {
    
    let timeout;

    function handleQuery(e) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setQuery(e.target.value);
        }, 1000);
    }

    return(
        <input onChange={handleQuery} className="rounded-md px-20 pl-1 py-2 border-black border-2" type="text" placeholder="Enter query..."/>
    )
}