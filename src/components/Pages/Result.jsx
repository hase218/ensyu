import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";


export default function Result() {
    const location = useLocation();
    const payload = location.state;
    const [imgs, setImgs] = useState(payload.imgData);
    const [category, setCategory] = useState(payload.categoryData);
    const [imgSL, setimgSL] = useState(payload.imgDataSL);
    //これuseState使ってる意味あんのかな

    const [maxCategory, setMaxCategory] = useState(() => {
        return Object.keys(category).reduce((maxKey, key) => {
            if (category[key] > (category[maxKey] || 0)) {
                return key;
            } else {
                return maxKey;
            }
        }, "");
    });

    console.log(imgSL);
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
            {imgSL && (
                <Box sx={{ marginTop: 4, textAlign: "center" }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        あなたが特別気に入った子は
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "300px", // 固定幅
                            height: "300px", // 固定高さ
                            overflow: "hidden",
                            borderRadius: "8px",
                            border: "2px solid #ccc",
                            margin: "auto",
                        }}
                    >
                        <img
                            src={imgSL}
                            alt="Special dog"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", // 画像をコンテナにフィットさせる
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
