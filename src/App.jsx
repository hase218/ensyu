import Header from "./components/Header";
import Side from "./components/Side";
import Footer from "./components/Footer";

export default function App() {
    return (
        <div>
            <Header />
            <Side />
            <Footer />
        </div>
    );
}
// import { useEffect, useState } from "react"


// function randomValueFromArray(array){
//     const random = Math.floor(Math.random()*array.length);
//     return array[random];
// }

// export default function App() {
//     const [img, setImg] = useState();
//     const Breeds = ["germanshepherd", "corgi"]
//     const [breed, setBreed] = useState(randomValueFromArray(Breeds));

//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
//                 if (!response.ok) { // ステータスコードが200番台でなければエラーをスロー
//                     throw new Error(`HTTPエラー: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log(data.message)
//                 setImg(data.message);
//             } catch (error) {
//                 console.error(error.message);
//             }
//         })();
//     }, [breed]);
//     return (

//         <div>
//             <p>inu</p>
//             <img class="dogs" src={img} alt="randomDogs" />
//         </div>

//     );
// };