import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // when time runs out, set answer to (false)
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; 
    }

    // create timer
    const timer = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    // clear up after timer & submitting to next question.
    return function () {
      clearTimeout(timer);
    };
    // when timeRemaining or onAnswered change...
  }, [timeRemaining, onAnswered]);


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        // Here is when we decide ...if the answer isCorrect!
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
