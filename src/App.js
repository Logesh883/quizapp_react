import React, { useEffect, useState } from "react";
import logo from "./../src/logo.svg";
function App() {
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [marks, setMarks] = useState(null);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=6&difficulty=medium&type=multiple"
    )
      .then((res) => res.json())
      .then((json) => {
        setQuiz(json.results);
      });
  }, []);

  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedMarks = quiz.reduce((totalMarks, question, i) => {
      if (question.correct_answer === selectedAnswers[i]) {
        return totalMarks + 1;
      }
      return totalMarks;
    }, 0);
    setMarks(calculatedMarks);
    calculatedMarks = 0;
  };

  return (
    <>
      <p className=" bg-blue-950 text-center text-5xl font-bold pt-3 relative text-[#FF6969]">
        QUIZ{" "}
        <span className="text-yellow-300 ml-2 absolute text-xl font-serif bottom-1 tracking-wider">
          TRAIN YOURSELF DAILY
        </span>{" "}
      </p>
      <form className=" bg-blue-950 p-6" onSubmit={handleSubmit}>
        <div>
          {quiz.length > 0 ? (
            quiz.map((question, i) => (
              <div key={i} className="text-white mb-5">
                <p className="text-pink-400 font-bold uppercase text-lg">
                  Question {i + 1}
                </p>
                <p className="mb-3 text-xl font-bold">{question.question}</p>
                <div className="flex flex-wrap flex-1 text-slate-300 gap-2">
                  <label className="border cursor-pointer rounded-lg p-3 w-[50%] flex gap-2 accent-green-400 hover:bg-pink-500">
                    <input
                      type="radio"
                      name={`answer_${i}`}
                      value={question.correct_answer}
                      required
                      className="w-[17px]"
                      onChange={() =>
                        handleAnswerSelection(i, question.correct_answer)
                      }
                    />
                    {question.correct_answer}
                  </label>
                  {question.incorrect_answers.map((incorrectAnswer, j) => (
                    <label
                      key={j}
                      className="border cursor-pointer rounded-lg p-3 w-[50%] flex gap-2 accent-green-400 hover:bg-pink-500"
                    >
                      <input
                        type="radio"
                        name={`answer_${i}`}
                        className="w-[17px]"
                        value={incorrectAnswer}
                        onChange={() =>
                          handleAnswerSelection(i, incorrectAnswer)
                        }
                      />
                      {incorrectAnswer}
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="h-screen">
              <img src={logo} className="animate-spin  w-80 ml-[40%]" />
              <p className="flex justify-center   text-2xl font-bold text-green-500">
                Loading...
              </p>
            </div>
          )}
        </div>
        {quiz.length > 0 && marks !== null ? (
          <div className="w-[50%] flex text-white text-xl font-bold mb-3 justify-around">
            <p className="text-white text-xl font-bold mt-3">
              Your marks: {marks} out of {quiz.length}
            </p>

            <button
              onClick={() => window.location.reload(false)}
              className="border-2 border-b-pink-700 p-2 border-transparent hover:border-pink-500 hover:bg-pink-500 hover:rounded-xl"
            >
              Play Again !!!
            </button>
          </div>
        ) : quiz.length > 0 ? (
          <div className="w-[50%] mx-auto">
            <input
              type="submit"
              className="p-3 w-40 rounded-xl uppercase tracking-wider font-bold text-slate-300 bg-pink-500 hover:bg-pink-400 border"
            />
          </div>
        ) : null}
      </form>
    </>
  );
}

export default App;

{
  /* <div className="w-[50%] mx-auto">
            <input
              type="submit"
              className="p-3 w-40 rounded-xl uppercase tracking-wider font-bold text-slate-300 bg-pink-500 hover:bg-pink-400 border"
            />
          </div> */
}
