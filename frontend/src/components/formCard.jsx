import { Card } from "@mui/material";

const FormCard = ({title, children}) => {
    return (
        <Card elevation={1} style={{height:'100%', padding:'20px'}}>
            <h2 style={{marginTop:0}}>{title}</h2>
            {children}
        </Card>
    );
}

export default FormCard;