import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Hero from "../components/home/hero";
import CourseCard from "../components/home/courseCard";
import { courseApi } from "../utils/api";
import { toast } from "react-toastify";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const page = 1; // You can set the page number here
        const rows = 50; // You can set the number of rows here
        const { data } = await courseApi.get("/course/all", { params: { page, rows } });
        // Filter out the unpublished courses
        const publishedCourses = data.payload.rows.filter(course => course.published);
        setCourses(publishedCourses);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Hero />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Popular Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
