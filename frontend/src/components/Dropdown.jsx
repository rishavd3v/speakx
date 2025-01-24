export default function Dropdown({ setType }) {

    function handleType(e){
        setType(e.target.value);
    }
    return(
        <div className="flex flex-col gap-1">
            <label htmlFor="type">Select question type:</label>
            <div className="w-max">
                <select onChange={handleType} defaultValue={"All"} id="type" className="px-2 py-1 pr-4 border-black border-2 rounded-md">
                    <option value="">All</option>
                    <option value="MCQ">MCQs</option>
                    <option value="ANAGRAM">Anagram</option>
                    <option value="READ_ALONG">Read Along</option>
                    <option value="CONTENT_ONLY">Content Only</option>
                    <option value="CONVERSATION">Conversation</option>
                </select>
            </div>
        </div>
    )
}
