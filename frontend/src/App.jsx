import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import QuestionContainer from "./components/QuestionContainer";
import Pagination from "./components/Pagination";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
  const [questions, setQuestions] = useState();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    handleSearch();
    setPage(1);
  }, [type, query]);

  useEffect(() => {
    handleSearch();
  }, [page]);

  async function handleSearch(e) {
    if (e) e.preventDefault();
    const data = await axios.get(
      "https://speakx-backend.vercel.app/api/questions",
      {
        params: {
          query,
          type,
          page,
        },
      }
    );

    setQuestions(data.data);
    setTotalPages(Math.ceil(data.data.total_count / 10));
  }

  return (
    <div className="bg-white min-h-screen">

      <Navbar />

      <div className="md:p-10 p-10">

        <div className="md:px-30">
          <Form setQuery={setQuery} setType={setType} />
        </div>

        <QuestionContainer questions={questions} />

        {totalPages >= 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

      </div>

    </div>
  );
}

export default App;
