export default function InputBar({ setQuery }) {
    
    let timeout;

    function handleQuery(e) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setQuery(e.target.value);
        }, 500);
    }

    return(
        <input onChange={handleQuery} className="rounded-md md:pl-1 md:px-20 py-2 border-black border-2 medium" type="text" placeholder="Enter query..."/>
    )
}