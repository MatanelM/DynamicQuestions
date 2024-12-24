import { CircularProgress, Container } from "@mui/material";

const Loading = () => {
    return (
        <div className="loading" >
        <Container maxWidth="md" style={{display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh', marginTop: '20px'}}><CircularProgress /></Container>
    </div>
    );

};

export default Loading;