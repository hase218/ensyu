import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';

function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

export default function Top() {
    const [dogCategory, setDogCategory] = useState([]); //犬辞書型
    const [dogBreeds, setDogBreeds] = useState([]); //辞書型のkeyだけとった配列
    const [breed, setBreed] = useState(null); //画像取得用の犬種名
    const [img, setImg] = useState(null);
    //空でもいいけど、nullの方が親切

    const [likeImgs, setLikeImgs] = useState([]); //気に入った写真
    const [likeCategory, setLikeCategory] = useState([]); //気に入った犬種
    const [superLikeImg, setSuperLikeImg] = useState(); //めっちゃ気に入った写真
    const [superLiked, setSuperLiked] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate(); //ページ自動遷移用

    //スライド動作に必要な変数
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [distanceX, setDistanceX] = useState(0);
    const [distanceY, setDistanceY] = useState(0);

    useEffect(() => {
        (async () => {
            const response = await fetch("dogs.json");
            const jsonData = await response.json();
            //.jsonも非同期だったネー

            const array1 = {};
            const array2 = {};
            jsonData.forEach((element) => {
                array2[element.category] = 0;
                element.breeds.forEach((breed) => {
                    array1[breed] = element.category;
                })
            })
            setDogCategory(array1);
            setDogBreeds(Object.keys(array1));
            setLikeCategory(array2);
            if (Object.keys(array1).length > 0) {
                setBreed(randomValueFromArray(Object.keys(array1)));
            }
        })();
    }, []);


    useEffect(() => {
        if (breed) { //breedがnullでないとき画像を取得（nullだと無意味なリクエストを送ることになる）
            (async () => {
                try {
                    let newImg;
                    let isDuplicate;
                    do {
                        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                        if (!response.ok) {
                            throw new Error(`HTTPエラー: ${response.status}`);
                        }
                        const data = await response.json();
                        newImg = data.message;
                        isDuplicate = likeImgs.includes(newImg);
                    } while (isDuplicate); // 重複している場合は再取得

                    setImg(newImg);
                } catch (error) {
                    console.error(error.message);
                    setBreed(randomValueFromArray(dogBreeds));
                }
            })();
        }
    }, [breed, likeImgs]);

    useEffect(() => {
        if (count > 11) {
            (async () => {
                const payload = { imgData: likeImgs, categoryData: likeCategory, imgDataSL: superLikeImg};
                try {
                    navigate("/result", { state: payload });
                } catch (error) {
                    console.error(error.message);
                }
            })();
        }
        [count, navigate]
    });

    const handleMouseDown = (e) => {
        // e.preventDefault();
        setIsDragging(true);
        setStartX(e.clientX); //クリックされたときのx座標を記録
        setStartY(e.clientY);
    };

    const handleMouseMove = (e) => {
        // e.preventDefault();
        if (!isDragging) return;

        const currentX = e.clientX;
        const currentY = e.clientY;
        const disX = currentX - startX;
        const disY = currentY - startY;
        setDistanceX(disX);
        setDistanceY(disY);

        if (disX > 30) {  // 30px以上右にスライドしたら
            handleSlideRight();
        }
        if (disX < -30) {  // 30px以上左にスライドしたら
            handleSlideLeft();
        }
        if (disY < -30) {
            handleSlideUp();
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDistanceX(0); // スライド距離をリセット
    };

    const handleSlideRight = () => {
        // console.log("slideRight");
        setLikeImgs(prevImg => [...prevImg, img]);
        setLikeCategory((prevCategory) => ({
            ...prevCategory,
            [dogCategory[breed]]: prevCategory[dogCategory[breed]] + 1,
        }));
        let newBreed;
        do {
            newBreed = randomValueFromArray(dogBreeds);
        } while (newBreed === breed);

        setBreed(newBreed);
        setDistanceX(0);
        setIsDragging(false);
        setCount((prevCount) => prevCount + 1);
    };
    const handleSlideLeft = () => {
        let newBreed;
        do {
            newBreed = randomValueFromArray(dogBreeds);
        } while (newBreed === breed);
        setBreed(newBreed);
        setDistanceX(0);
        setIsDragging(false);
    }

    // console.log(superLikeImg);
    const handleSlideUp = () => {
        if (superLiked) {
            return alert("もうつかえないよ！");
        }
        // console.log("slideUp");
        setSuperLikeImg(img);
        setLikeCategory((prevCategory) => ({
            ...prevCategory,
            [dogCategory[breed]]: prevCategory[dogCategory[breed]] + 3,
        }));
        let newBreed;
        do {
            newBreed = randomValueFromArray(dogBreeds);
        } while (newBreed === breed);

        setSuperLiked(true);
        setBreed(newBreed);
        setDistanceY(0);
        setIsDragging(false);
        setCount((prevCount) => prevCount + 1);
    }

    if (breed === null || img === null) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
        
    }

    return (
        <Grid container spacing={4} sx={{ padding: 4 }} backgroundColor={"white"}>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "400px", // 最大幅を設定
                        height: "300px",
                        overflow: "hidden",
                        border: "2px solid #333",
                        borderRadius: "10px",
                        position: "relative",
                        marginBottom: 2,
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <img
                        className="dogs"
                        src={img}
                        alt="randomDogs"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                        }} />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    sx={{
                        color: '#333',
                        borderColor: '#333',
                        padding: '12px 24px',
                        fontSize: '18px',
                        '&:hover': {
                            backgroundColor: '#888',
                        },
                        marginBottom: 2,
                        width: '100%',
                        maxWidth: '250px', // 最大幅を設定
                    }}
                    onClick={() => { setLikeImgs([]), setLikeCategory([]), setCount(0) }}
                >
                    やりなおし
                </Button>
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    {`選択した回数: ${count}`}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <IconButton
                    onClick={() => { handleSlideLeft() }}
                    size="large"
                    sx={{
                        fontSize: '2rem',
                        color: '#333',
                        '&:hover': {
                            backgroundColor: '#ddd',
                        }
                    }}>
                    <ClearIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
                <IconButton
                    onClick={() => { handleSlideRight() }}
                    size="large"
                    sx={{
                        fontSize: '2rem',
                        color: '#333',
                        '&:hover': {
                            backgroundColor: '#ddd',
                        }
                    }}>
                    <FavoriteIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
            </Grid>
        </Grid>
    );
};
