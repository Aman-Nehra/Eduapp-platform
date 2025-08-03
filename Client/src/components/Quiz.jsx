import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Quiz = () => {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleClick = (eventName, data = {}) => {
    addDoc(collection(db, 'clickstream'), {
      user: user?.uid || 'unknown',
      page: `quiz/${id}`,
      event: eventName,
      data,
      timestamp: serverTimestamp()
    });
  };

  useEffect(() => {
    handleClick('view_quiz');
  }, []);

  const handleSubmit = () => {
    if (selected !== null) {
      setSubmitted(true);
      handleClick('submit_quiz', { answer: selected });
    }
  };

  return (
    <div>
      <h2>Quiz {id}</h2>
      <p>What is 2 + 2?</p>
      <ul>
        {["2", "3", "4", "5"].map((choice, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={choice}
                onChange={() => {
                  setSelected(choice);
                  handleClick('select_answer', { choice });
                }}
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={submitted}>
        Submit
      </button>
      {submitted && <p>Answer submitted: {selected}</p>}
    </div>
  );
};

export default Quiz;