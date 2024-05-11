import React from 'react';
import { useParams } from 'react-router-dom';

const CourseContent = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL

  // Hardcoded PDF URLs
  const pdfs = [
    { id: 1, title: "Introduction to React", fileName: "AF.pdf" },
    { id: 2, title: "State Management in React", fileName: "AF1.pdf" },
    { id: 3, title: "React Hooks Explained", fileName: "DS.pdf" }
  ];

  return (
    <div>
      <h1>Course Content</h1>
      <p>This is the content of the course with ID: {id}</p>
      {/* Display hardcoded PDFs as links */}
      {pdfs.map(pdf => (
        <div key={pdf.id}>
          <h2>{pdf.title}</h2>
          {/* Create a link to download the PDF */}
          <a href={`/pdfs/${pdf.fileName}`} download={pdf.fileName}>
            {pdf.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
