import { useEffect, useState } from "react";

export default function Gallery() {
    const [dogCategoryMap, setDogCategoryMap] = useState({});
    const [dogImgMap, setDogImgMap] = useState({});

    useEffect(() => {
        (async () => {
            const response = await fetch("dogs.json");
            const jsonData = await response.json();

            const array = {};
            jsonData.forEach((element) => {
                array[element.category] = element.breeds[0];
            });

            setDogCategoryMap(array);
        })();
    }, []);

    
    // dogCategoryMapの各カテゴリーについて画像を取得
    useEffect(() => {
        if (Object.keys(dogCategoryMap).length === 0) return;

        (async () => {
            const array = {};

            await Promise.all(
                Object.entries(dogCategoryMap).map(async ([category, breed]) => {

                    try {
                        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
                        if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                            throw new Error(`HTTPエラー: ${response.status}`);
                        }
                        const data = await response.json();
                        array[category] = data.message;
                    } catch (error) {
                        console.error(error.message);
                    }
                })
            );
            setDogImgMap(array);
        });
    }, [dogCategoryMap]);

    console.log(dogCategoryMap);
    console.log(dogImgMap);

    return (
        <div>
            <p>準備中</p>
        </div>
    );
}
