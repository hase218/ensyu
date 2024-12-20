import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

export default function Top() {
    const [img, setImg] = useState();
    const Breeds = ["germanshepherd", "corgi"]
    const [breed, setBreed] = useState(randomValueFromArray(Breeds));
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [distanceX, setDistanceX] = useState(0);
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                const data = await response.json();
                console.log(data.message)
                setImg(data.message);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [breed]);

    const handleMouseDown = (e) => {
        e.preventDefault();//ブラウザのデフォルトの動きをなくす
        setIsDragging(true);
        setStartX(e.clientX); //クリックされたときのx座標を記録
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (!isDragging) return;

        const currentX = e.clientX;
        const distance = currentX - startX;
        setDistanceX(distance);

        if (distance > 30) {  // 30px以上右にスライドしたら
            handleSlideRight();
        }
        if (distance < -30) {  // 30px以上左にスライドしたら
            handleSlideLeft();
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDistanceX(0); // スライド距離をリセット
    };

    const handleSlideRight = () => {
        // alert("画像が右にスライドされました！");
        setDogs(prevImg => [...prevImg, img]);
        setBreed(randomValueFromArray(Breeds));
        setDistanceX(0);
        setIsDragging(false);
    };
    const handleSlideLeft = () => {
        // alert("左にスライドされた")
        setBreed(randomValueFromArray(Breeds));
        setDistanceX(0);
        setIsDragging(false);
    }
    return (
        <div>
            <Grid container>
                <Grid item>
                    <Box
                        sx={{
                            width: "400px",
                            height: "300px",
                            overflow: "hidden",
                            border: "2px solid black",
                            position: "relative",
                            textAlign: "center",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img className="dogs" src={img} alt="randomDogs" />
                    </Box>
                </Grid>
            </Grid>

        </div>

    );
};