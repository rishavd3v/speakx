import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import QuestionContainer from "./components/QuestionContainer";
import Pagination from "./components/Pagination";
import axios from "axios";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/questions";
function App() {
  const [questions, setQuestions] = useState();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);
    setQuestions();
    setTotalPages(0);
    handleSearch();
  }, [type, query, page]);

  useEffect(() => {
    setPage(1);
  }, [type, query]);

  async function handleSearch(e) {
    if (e) e.preventDefault();
    const data = await axios.get(
      `${backendUrl}`,
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
    setLoading(false);
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="p-10">
        <div className="md:px-30">
          <Form setQuery={setQuery} setType={setType} />
        </div>

        {loading ? (
          <Loading />
        ) : questions && questions.total_count > 0 ? (
           <>
             <p className="flex justify-center font-semibold text-gray-500 text-md mt-16">Total Questions: {questions.total_count} | Page: {page} of {totalPages}</p>
             <QuestionContainer questions={questions} />
           </>
        ) : (
          <span className="mt-20 flex justify-center">No Results!!!</span>
        )}

        {totalPages >= 1 && !loading && (
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
