import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { courseApi } from "../../utils/api";
import BreadCrumbs from "../../components/breadcrubs";

const CourseHomePage = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const fetchCourses = async(page = 1, rows = 50) => {
        try {
            setIsLoading(true);
            let {data} = await courseApi.get(`/course/all`, {params: {page, rows}});

            console.log(data);
            setCourses(data.payload.rows);

            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses()
    },[])

    return (
        <>
            <div style={{width:'100%', padding:'20px', display:'flex', flexDirection:'column'}}>
                <BreadCrumbs />
                <Grid container>
                    <Grid item xs={6}>
                        <Typography fontSize={30}>All Courses</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign={'right'}>
                        <Button variant={'contained'} color={'primary'} onClick={() => navigate('./create')}>Add Course</Button>
                    </Grid>
                    <Grid item xs={12}>
                        {courses.map((course, index) => (
                            <Card key={index} elevation={1} style={{width:'100%', display:'flex', flexDirection:'column', padding:'20px', border:'1px solid #f3d607', borderRadius:'5px', margin:'10px 0px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <img src={import.meta.env.VITE_COURSE_SERVER_URL+course.thumbnail} alt={course.title} style={{width:'100%', height:'auto', borderRadius:'5px'}} />
                                    </Grid>
                                    <Grid item xs={12} md={9}>
                                        <Typography fontSize={25}>{course.name}</Typography>
                                        <p>{course.desc}</p>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
}

export default CourseHomePage;