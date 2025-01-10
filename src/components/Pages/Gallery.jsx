import { useEffect, useState } from "react";
import {Box, Grid, Typography, Card, CardMedia, CardContent, Modal, Backdrop, Fade} from "@mui/material";
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
        return <div>Loading...</div>;
    }
    
    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={4} justifyContent="center">
                {dogsData.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Box sx={{ border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                                <p>{item}</p>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
