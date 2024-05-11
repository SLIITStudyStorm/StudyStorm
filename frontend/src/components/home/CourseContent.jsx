import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { learnerApi } from "../../utils/api";

const CourseContent = () => {
  const { id } = useParams(); // Retrieve the course ID from the URL

  const pdfs = [
    { id: 1, title: "Introduction to React", fileName: "AF.pdf" },
    { id: 2, title: "State Management in React", fileName: "AF1.pdf" },
    { id: 3, title: "React Hooks Explained", fileName: "DS.pdf" }
  ];
  const handleDownload = async (pdfId) => {
    try {
      // Fetch user email from local storage
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) {
        throw new Error('User info not found in local storage');
      }
      const { email } = JSON.parse(userInfo);
  
      console.log('User email:', email);
      console.log('Course ID:', id);
      console.log('PDF ID:', pdfId);
    
      // Send a request to your backend to track progress
      const response = await learnerApi.post(
        '/progress/tracking', 
        {
          courseId: id,
          userEmail: email, // Use the retrieved user email
          pdfIds: [pdfId] // Pass array of PDF IDs
        }
      );
      console.log('Response:', response);
      if (response.status === 201) { // Check for status code 201 for successful creation
        toast.success('Progress tracked successfully');
      } else {
        throw new Error('Failed to track progress');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to track progress');
    }
  };

  useEffect(() => {
    const handlePdfClick = (event) => {
      event.preventDefault();
      const pdfId = event.target.getAttribute('data-pdf-id');
      if (pdfId) {
        handleDownload(parseInt(pdfId)); // Convert pdfId to integer if necessary
      }
    };

    pdfs.forEach((pdf) => {
      const anchor = document.getElementById(`pdf-link-${pdf.id}`);
      if (anchor) {
        anchor.addEventListener('click', handlePdfClick);
      }
    });

    // Clean up event listeners
    return () => {
      pdfs.forEach((pdf) => {
        const anchor = document.getElementById(`pdf-link-${pdf.id}`);
        if (anchor) {
          anchor.removeEventListener('click', handlePdfClick);
        }
      });
    };
  }, [pdfs, id]);

  return (
    <div>
      <h1>Course Content</h1>
      <p>This is the content of the course with ID: {id}</p>
      {/* Display hardcoded PDFs as links */}
      {pdfs.map(pdf => (
        <div key={pdf.id}>
          <h2>{pdf.title}</h2>
          {/* Create a link to download the PDF */}
          <a id={`pdf-link-${pdf.id}`} href={`/pdfs/${pdf.fileName}`} download={pdf.fileName} data-pdf-id={pdf.id}>
            {pdf.title}
          </a>
        </div>
      ))}
    </div>
  );
};


export default CourseContent;
