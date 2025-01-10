import { useEffect, useState } from "react";
import {Box, Grid, Typography, Card, CardMedia, CardContent, Modal, Backdrop, Fade, CircularProgress} from "@mui/material";
export default function Gallery() {
    const [dogsData, setDogsData] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch("dogs.json");
            const jsonData = await response.json();
            const array = jsonData.map(item => item.category);
            setDogsData(array);
        })();
    }, []);

    console.log(dogsData);
    if (dogsData === null) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (<Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
        <Typography variant="h4" align="center" gutterBottom>
            Dog Gallery
        </Typography>
        <Grid container spacing={4} justifyContent="center">
            {dogsData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                        sx={{
                            maxWidth: 345,
                            boxShadow: 3,
                            borderRadius: "16px",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <CardMedia
                            sx={{
                                height: 180,
                                backgroundColor: "#e0e0e0", // グレーの塗りつぶし
                            }}
                            title="Placeholder"
                        />
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                                {item}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);
}
