const createFileObjectFromPath = async(path) => {
    path = import.meta.env.VITE_COURSE_SERVER_URL+path
    const response = await fetch(path);
    const blob = await response.blob();
    
    let fileObj = new Object([{
        name: response.url.split('/').pop(),
        size: blob.size,
        type: blob.type,
        objectURL: URL.createObjectURL(blob),
    }]);
    return fileObj;
}

export default createFileObjectFromPath;