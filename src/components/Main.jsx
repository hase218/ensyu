import Guide from "./Pages/Guide";
import Result from "./Pages/Result";
import Top from "./Pages/Top";
import Gallery from "./Pages/Gallery";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";

export default function Main() {
    return (
        <Grid container>
            <BrowserRouter>
                <Link to="/">トップ</Link>
                <Link to="/Guide">あそびかた</Link>
                <Link to="/Gallery">犬一覧</Link>
                <Routes>
                    <Route path="/" element={<Top />} />
                    <Route path="/Guide" element={<Guide />} />
                    <Route path="/Result" element={<Result />} />
                    <Route path="/Gallery" element={<Gallery />} />
                </Routes>
            </BrowserRouter>
        </Grid>
    );
}