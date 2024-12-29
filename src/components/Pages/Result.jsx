import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Result() {
    const location = useLocation();
    const payload = location.state;
    //location.state.imgDataがうごかないのはなぜ
    const [img, setImg] = useState(payload.imgData);
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
        </div>

    );
}