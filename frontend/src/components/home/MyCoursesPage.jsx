import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import { learnerApi, courseApi } from "../../utils/api";
import { toast } from "react-toastify";
import MyCourseCard from './MyCourseCard'; // Importing the MyCourseCard component

const MyCoursesPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch user info from local storage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { email } = JSON.parse(userInfo);
      setUserEmail(email);
    }
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        if (userEmail) {
          setLoading(true);
          const response = await learnerApi.get(`/enrollment/enrolledCourses/${userEmail}`);
          const enrolledCourseIds = response.data.enrolledCourses;
          const promises = enrolledCourseIds.map(async (enrolledCourseId) => {
            const { data } = await courseApi.get(`/course/one/${enrolledCourseId}`);
            return data.payload;
          });
          const coursesData = await Promise.all(promises);
          setCourses(coursesData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        setLoading(false);
        toast.error("Failed to fetch enrolled courses.");
      }
    };

    fetchEnrolledCourses();
  }, [userEmail]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>
      {loading ? (
        <Typography variant="body1">
          Loading...
        </Typography>
      ) : courses.length > 0 ? (
        <Grid container spacing={2}>
          {courses.map((course, index) => (
            <MyCourseCard key={index} course={course} />
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">
          You haven't enrolled in any courses yet.
        </Typography>
      )}
    </Container>
  );
};

export default MyCoursesPage;
