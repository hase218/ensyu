import { useEffect, useState } from "react"

export default function App() {
    const [img, setImg] = useState();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://random.dog/woof.json");
                if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
                const data = await response.json();
                setImg(data.url);
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, []);
    return (
        <header>
            <div>
                <main>
                    <p>inu</p>
                    <img src={img} alt="randomDogs" />
                </main>
            </div>
            <footer>
                aaaaa
            </footer>
        </header>
    );
}