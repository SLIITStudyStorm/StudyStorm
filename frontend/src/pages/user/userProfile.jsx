import { Container } from "react-bootstrap";
import { AccountInfo } from "../../components/user/account/accountInfo";
import AccountDetailsForm from "../../components/user/account/userDetails";
import Grid from "@mui/material/Grid";

export default function UserProfilePage() {
  return (
    <Container style={{ marginTop: '100px' , marginLeft:'auto',marginRight:'auto' }}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid item md={9} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Container>
  );
}
