import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <CircularProgress />
            <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>Cargando...</p>
        </div>
    );
};

export default Loading;
