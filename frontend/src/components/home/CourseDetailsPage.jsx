import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Button, Divider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { courseApi } from "../../utils/api";
import { toast } from "react-toastify";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseContents, setCourseContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const { data } = await courseApi.get(`/course/one/${id}`);
      setCourseDetails(data.payload);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourseContents = async (page = 1, rows = 50) => {
    try {
      setIsLoading(true);
      const { data } = await courseApi.get(`/course/content/all`, { params: { page, rows, course_id: id } });
      setCourseContents(data.payload.rows);
    } catch (error) {
      setCourseContents([]);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseDetails();
      fetchCourseContents();
    }
  }, [id]);

  const handleGetStarted = () => {
    const userEmail = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).email : null;
    if (userEmail) {
      const nextPageUrl = `/paymentPage?email=${encodeURIComponent(userEmail)}&courseId=${id}`;
      window.location.href = nextPageUrl;
    } else {
      // Handle case when user email is not found in local storage
      // You can redirect to login or display a message
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {isLoading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : (
        <>
          {courseDetails ? (
            <Grid container spacing={2} sx={{ paddingTop: 10 }}>
              {/* Course Image Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="440"
                    image={`${import.meta.env.VITE_COURSE_SERVER_URL}${courseDetails.thumbnail}`}
                    onError={(event) => { event.target.src = "/default-course-image.jpg" }}
                    alt={courseDetails.name}
                  />
                </Card>
              </Grid>
              {/* Course Details Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', paddingTop: 4 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" gutterBottom>
                      {courseDetails.name}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" gutterBottom>
                      {courseDetails.desc}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" gutterBottom>
                      Price: {courseDetails.price === 0 ? "FREE" : `$${courseDetails.price}`}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Level: {courseDetails.level}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Type: {courseDetails.type}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Duration: {courseDetails.duration}
                    </Typography>
                  </CardContent>
                  <Grid container justifyContent="center" mt={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary" onClick={handleGetStarted}>
                        Get started
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              {/* Course Contents Section */}
              <Grid item xs={12} sx={{ marginTop: 4 }}>
                <Typography variant="h5" mb={2}>
                  Course Contents
                </Typography>
                {courseContents.map((content, index) => (
                  <Accordion key={index} sx={{ marginBottom: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {content.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1" fontWeight="bold" sx={{ marginBottom: '10px' }}>
                        {content.subtitle}
                      </Typography>
                      <Typography variant="body1">
                        {content.desc}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h5">Course not found</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default CourseDetailsPage;
