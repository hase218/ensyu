import Guide from "./Pages/Guide";
import Result from "./Pages/Result";
import Top from "./Pages/Top";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

export default function Main() {
    return (
        <div>
            <BrowserRouter>
                <Link to="/">Top</Link>
                <Link to="/Guide">Guide</Link>
                <Routes>
                    <Route path="/" element={<Top />} />
                    <Route path="/Guide" element={<Guide />} />
                    <Route path="/Result" element={<Result />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}