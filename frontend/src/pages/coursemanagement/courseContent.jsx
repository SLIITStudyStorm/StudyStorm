import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/breadcrubs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { courseApi } from "../../utils/api";
import createFileObjectFromPath from "../../utils/createFileObjectFromPath";
import dayjs from "dayjs";

const CourseContentPage = () => {

    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [customCrumb, setCustomCrumb] = useState('');
    const [desc, setDesc] = useState('');
    const [subject, setSubject] = useState(null);
    const [skills, setSkills] = useState([]);
    const [language, setLanguage] = useState('English');
    const [type, setType] = useState('Course');
    const [level, setLevel] = useState('Beginner');
    const [duration, setDuration] = useState('Less Than 2 Hours');
    const [startDate, setStartDate] = useState(null);
    const [price, setPrice] = useState(0);
    const [publish, setPublish] = useState(false);

    const { id } = useParams()
    

    const fetchCourse = async() => {
        try {
            let {data} = await courseApi.get(`/course/one/${id}`);

            setTitle(data.payload.name);
            setCustomCrumb(data.payload.name)
            setDesc(data.payload.desc);
            setSubject(data.payload.subject);  
            setLanguage(data.payload.language);
            setType(data.payload.type);
            setLevel(data.payload.level);
            setDuration(data.payload.duration);
            setSkills(data.payload.skills);
            setStartDate(dayjs(data.payload.start_date));
            setPrice(data.payload.price);
            setPublish(data.payload.published);

            if(data.payload.thumbnail) {
                let file = await createFileObjectFromPath(data.payload.thumbnail);
                setFiles(file);
            }

            console.log(data.payload);
            toast.success(data.message);

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        if(id){
            fetchCourse()
        }
    }, [])


    return (
        <>
            <div style={{width:'100%', padding:'20px', display:'flex', flexDirection:'column'}}>
                <BreadCrumbs customLast={true} customCrumb={customCrumb} />
            </div>
        </>
    );
}

export default CourseContentPage;