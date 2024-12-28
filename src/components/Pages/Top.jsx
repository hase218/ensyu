import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Result from "./Result";

//右に動かしたときに、犬種から辞書型にあるカテゴリーをとりだしたい
//15回動かしたら結果のページに動くようにする


function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

export default function Top() {
    const [dogCategory, setDogCategory] = useState([]); //犬辞書型
    const [dogBreeds, setDogBreeds] = useState([]); //辞書型のkeyだけとった配列
    const [breed, setBreed] = useState(); //画像取得用の犬種名
    const [img, setImg] = useState();

    const [likeImgs, setLikeImgs] = useState([]);
    const [count, setCount] = useState(0);

    //スライド動作に必要な変数
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [distanceX, setDistanceX] = useState(0);

    useEffect(() => {
        (async () => {
          const response = await fetch("dogs.json");
          const jsonData = await response.json();
          //.jsonも非同期だったネー

          const array1 = {};
          console.log(jsonData);
          jsonData.forEach((element) => {
            element.breeds.forEach((breed) => {
                array1[breed] = element.category;
            })
          })
          setDogCategory(array1);
          setDogBreeds(Object.keys(array1));
          setBreed(randomValueFromArray(Object.keys(array1)));
        })();
      }, []);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                const data = await response.json();
                // console.log(data.message)
                setImg(data.message);
            } catch (error) {
                console.error(error.message);
                setBreed(randomValueFromArray(dogBreeds));
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
        setLikeImgs(prevImg => [...prevImg, img]);

        //breedが被らないようにする
        let newBreed;
        do {
            newBreed = randomValueFromArray(dogBreeds);
        } while(newBreed === breed);

        setBreed(newBreed);
        setDistanceX(0);
        setIsDragging(false);
        setCount(count + 1);
    };
    const handleSlideLeft = () => {
        //alert("左にスライドされた")
        setBreed(randomValueFromArray(dogBreeds));
        setDistanceX(0);
        setIsDragging(false);
    }
    // console.log(dogCategory);
    // console.log(dogBreeds);
    console.log(setLikeCategory);
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
                            }} />
                    </Box>
                </Grid>
                <Grid item>
                    <div>{count}</div>
                </Grid>
            </Grid>

        </div>

    );
};