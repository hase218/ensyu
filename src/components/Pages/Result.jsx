import { useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';

export default function Result() {
    const location = useLocation();
    const payload = location.state;
    //location.state.imgDataがうごかないのはなぜ
    const [imgs, setImgs] = useState(payload.imgData);
    const [category, setCategory] = useState(payload.categoryData);

    const [maxCategory, setMaxCategory] = useState(() => {
        return Object.keys(category).reduce((maxKey, key) => { //Array.prototype.reduce()
            if (category[key] > (category[maxKey] || 0)) { //maxの初期値0
                return key;
            } else {
                return maxKey;
            }
        }, "");
    });

    // console.log(img);
    console.log(category);
    console.log(maxCategory);
    return (
        <div>
            あなたがえらんだのは
            <p>{maxCategory}</p>
            <Grid item>
                <Grid container spacing={2}>
                    {imgs.map((img, index) => {
                        // console.log(img, index)
                        return (
                            <Grid item xs={3}>
                                <img
                                    key={index}
                                    src={img}
                                    alt={img}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </div>

    );
}