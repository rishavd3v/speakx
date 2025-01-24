import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import QuestionContainer from './components/QuestionContainer'

function App() {

  
  const [questions, setQuestions] = useState();

  return (
    <div className='p-10'>
      <div className='px-30'>
        <Form setQuestions={setQuestions}/>
      </div>
      <QuestionContainer questions={questions}/>
    </div>
  )
}

export default App
