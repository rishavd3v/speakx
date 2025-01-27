export default function QuestionContainer({questions}){

    return(
        <div className="flex flex-col gap-16 my-18">
            {questions && questions.questions.map((question)=>{
                
                // Shuffle the blocks array
                const shuffledBlocks = question.blocks ? [...question.blocks].sort(() => Math.random() - 0.5) : [];

                return(
                    <div className="border-2 border-gray-200 p-4 rounded-md shadow-gray-300 shadow-md flex flex-col gap-2">
                        
                        {/* question type */}
                        <div className="font-medium">
                            Question Type: <span className="font-normal">{question.type}</span>
                            {question.type === "ANAGRAM" ? <div>Anagram Type: <span className="font-normal">{question.anagram_type}</span></div>:""}
                        </div>
                        
                        <div className="text-xl font-medium">
                            {question.title}
                        </div>

                        
                        {/* options and blocks */}
                        <div>
                            {question.options && question.options.map((option) => {
                                return (
                                    <div className={option.is_correct_answer ? "font-semibold" : ""}>
                                        - {option.text} {option.is_correct_answer ? <span>(correct)</span> : ""}
                                    </div>
                                )
                            })}
                            {shuffledBlocks.length > 0 && 
                                <div className={`flex gap-2 ${question.anagram_type === "SENTENCE"?"flex-col":""}`}>
                                    {shuffledBlocks.map((block) => {
                                        return (
                                            block.show_in_option &&
                                            <div className={`bg-black text-white text-center flex items-center justify-center ${question.anagram_type === "SENTENCE"?"w-max p-2":"h-10 w-10"}`}>
                                                {block.text}
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div> 
                        
                        {/* Solution */}
                        <div>
                            {question.solution && 
                                <div>
                                    <div className="font-medium">Solution: <span className="font-normal">{question.solution}</span></div>
                                </div>
                            }
                        </div>
                        



                    </div>
                )
            })}
             
        </div>
    )
}