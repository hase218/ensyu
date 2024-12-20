import Guide from "./Page/Guide";
import Top from "./Page/Top";
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
                </Routes>
            </BrowserRouter>
        </div>
    );
}