import { useState } from "react"
import { FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Switch, TextField, Typography } from "@mui/material"
import { toast } from "react-toastify";

import BreadCrumbs from "../../components/breadcrubs"
import FormCard from "../../components/formCard"
import FormUploadArea from "../../components/fileUpload"
import CustomAutoComplete from "../../components/autoComplete"
import CustomDatePicker from "../../components/datePicker"
import api from "../../utils/api";

import { DurationList, LanguageList, LevelList, SkillsList, SubjectList, TypeList } from "../../data"

const AddCoursePage = () => {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
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

    const [titleError, setTitleError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [languageError, setLanguageError] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [levelError, setLevelError] = useState(false);
    const [durationError, setDurationError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [priceError, setPriceError] = useState(false);


    const onSelect = (files) =>{
        setFiles(files);
    }

    const handleSubmit = async() => {
        try {
            if(titleError || descError || subjectError || languageError || typeError || levelError || durationError || startDateError || priceError){
                throw new Error('Please fill all the required fields');
            }

            
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div style={{width:'100%', padding:'20px', display:'flex', flexDirection:'column'}}>
                <BreadCrumbs />
                <FormCard title={"Course"} action={"Create"} onClick={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <FormUploadArea 
                                multiple={false}
                                accept={"image/*"}
                                maxFileSize={1000000}
                                label={"Course Thumbnail"}
                                selectfunc={onSelect}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={12}>
                                    <TextField 
                                        variant="outlined" size="small" 
                                        label="Title" placeholder="Title" 
                                        fullWidth
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value)

                                            if(!e.target.value) setTitleError(true);
                                            else setTitleError(false);
                                        }}
                                    />
                                    <Typography variant="caption" display={titleError ? 'block' : 'none'} color={"red"} gutterBottom>
                                        *{"Title is required"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <TextField 
                                        variant="outlined" size="small" 
                                        label="Description" placeholder="Description" 
                                        fullWidth 
                                        multiline 
                                        minRows={2}
                                        value={desc}
                                        onChange={(e) => {
                                            setDesc(e.target.value)
                                            
                                            if(!e.target.value) setDescError(true);
                                            else setDescError(false);
                                        }}
                                    />
                                    <Typography variant="caption" display={descError ? 'block' : 'none'} color={"red"} gutterBottom>
                                        *{"Description is required"}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Subject"}
                                        options={SubjectList}
                                        value={subject}
                                        setValue={setSubject}
                                        errorMsg={"Subject is required"}
                                        isError={subjectError}
                                        setError={setSubjectError}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Language"}
                                        options={LanguageList}
                                        value={language}
                                        setValue={setLanguage}
                                        errorMsg={"Language is required"}
                                        isError={languageError}
                                        setError={setLanguageError}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Type"}
                                        options={TypeList}
                                        value={type}
                                        setValue={setType}
                                        errorMsg={"Type is required"}
                                        isError={typeError}
                                        setError={setTypeError}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Level"}
                                        options={LevelList}
                                        value={level}
                                        setValue={setLevel}
                                        errorMsg={"Level is required"}
                                        isError={levelError}
                                        setError={setLevelError}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        label={"Duration"}
                                        options={DurationList}
                                        value={duration}
                                        setValue={setDuration}
                                        errorMsg={"Duration is required"}
                                        isError={durationError}
                                        setError={setDurationError}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomAutoComplete
                                        multiple={true}
                                        label={"Benefits"}
                                        options={SkillsList}
                                        value={skills}
                                        setValue={setSkills}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <CustomDatePicker
                                        label="Start Date"
                                        disablePast={true}
                                        value={startDate}
                                        setValue={setStartDate}
                                        errorMsg={"Start Date is required"}
                                        isError={startDateError}
                                        setError={setStartDateError}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Price</InputLabel>
                                        <OutlinedInput
                                            size="small"
                                            type="number"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Price"
                                            placeholder="Price"
                                            value={price}
                                            onChange={(e) => {
                                                setPrice(e.target.value)

                                                if(!e.target.value) setPriceError(true);
                                                else setPriceError(false);
                                            }}
                                        />
                                        <Typography variant="caption" display={priceError ? 'block' : 'none'} color={"red"} gutterBottom>
                                            *{"Description is required"}
                                        </Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <FormControlLabel 
                                        control={
                                            <Switch  
                                                checked={publish}
                                                onChange={(e) => setPublish(e.target.checked)}
                                            />
                                        } 
                                        label="Publish" 
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </FormCard>
            </div>
        </>
    )
}

export default AddCoursePage;