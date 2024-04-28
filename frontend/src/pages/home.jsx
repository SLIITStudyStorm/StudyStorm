import { Container } from "@mui/material";

const HomePage = () => {
  return (
    <Container style={{ width: '100%' }} id="top">
        <div style={{ minHeight: '100vh', height: '200vh' }}>
            <h1>Home Page</h1>
            <p>This is the home page.</p>
        </div>
    </Container>
  );
}

export default HomePage;