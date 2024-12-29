import { useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Result() {
    const location = useLocation();
    const payload = location.state;
    const [imgs, setImgs] = useState(payload.imgData);
    const [category, setCategory] = useState(payload.categoryData);

    const [maxCategory, setMaxCategory] = useState(() => {
        return Object.keys(category).reduce((maxKey, key) => {
            if (category[key] > (category[maxKey] || 0)) {
                return key;
            } else {
                return maxKey;
            }
        }, "");
    });

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 1 }}>
                あなたが選んだ犬種は
            </Typography>
            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                {maxCategory}
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {imgs.map((img, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Box sx={{ border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
                                <img
                                    src={img}
                                    alt={`dog-${index}`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover", // 画像をコンテナにフィットさせる
                                    }}
                                />
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
