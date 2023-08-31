// src/components/AboutPage.js
import React from 'react';

function AboutPage() {
  return (
    <div className="container">
      <h1 className='center'>About iNotebook</h1>
      <p>Welcome to iNotebook, your ultimate task and productivity manager.</p>
      <p>
        At iNotebook, we believe in simplifying your life by helping you
        effectively manage your tasks, boost productivity, and achieve your goals.
      </p>
      <p>
        With a user-friendly interface and powerful features, iNotebook allows
        you to create, organize, and track your tasks seamlessly. Whether you're
        a student, professional, or someone who wants to stay organized, iNotebook
        is here to support you every step of the way.
      </p>
      <p>
        Key Features:
        <ul>
          <li>Create tasks, set due dates, and prioritize your work.</li>
          <li>Organize tasks into projects and categories.</li>
          <li>Receive reminders and notifications to stay on track.</li>
          <li>Track your progress and view detailed productivity insights.</li>
        </ul>
      </p>
      <p>
        Get started with iNotebook today and unlock a new level of efficiency
        and success in your personal and professional life.
      </p>
      <footer className="about-footer">
        <p>&copy; 2023 iNotebook. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;
