import { useLocation } from "react-router-dom";

export default function Result() {
    const location = useLocation();
    const payload = location.state;
    //location.state.imgDataがうごかないのはなぜ
    const img = payload.imgData;
    const category = payload.categoryData;
    
    const maxCategory = Object.keys(category).reduce((maxKey, key) =>{
        if (category[key] > (category[maxKey] || 0)) { //maxの初期値0
            return key;
        } else {
            return maxKey;
        } 
    }, "");

    // console.log(img);
    console.log(category);
    console.log(maxCategory);
    return(
        <div>result</div>
    );
}