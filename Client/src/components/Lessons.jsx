// src/components/Lesson.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Lessons = () => {
  const { id } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleClick = (eventName) => {
    addDoc(collection(db, 'clickstream'), {
      user: user?.uid || 'unknown',
      page: `lesson/${id}`,
      event: eventName,
      timestamp: serverTimestamp()
    });
  };

  useEffect(() => {
    handleClick('view_lesson');
  }, []);

  return (
    <div>
      <h2>Lesson {id}</h2>
      <p>This is some interactive content for lesson {id}. Click around!</p>

      <button onClick={() => handleClick('clicked_next')}>Next</button>
      <button onClick={() => handleClick('clicked_previous')}>Previous</button>

      <div>
        <video
          width="400"
          controls
          onPlay={() => handleClick('video_play')}
          onPause={() => handleClick('video_pause')}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
    </div>
  );
};

export default Lessons;