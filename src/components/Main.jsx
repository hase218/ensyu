import Guide from "./Pages/Guide";
import Result from "./Pages/Result";
import Top from "./Pages/Top";
import Gallery from "./Pages/Gallery";
import { HashRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";

// HashRouterだと動く

// BrowserRouter の場合
// ユーザーが /Guide にアクセスしてリロードすると、サーバーに /Guide へのリクエストが送信されます。
// サーバーがこのリクエストを処理する設定（例: SPA の index.html にリダイレクト）がないと、404 Not Found になります。
// HashRouter の場合
// ユーザーが http://localhost:3000/#/Guide にアクセスしてリロードすると、サーバーには http://localhost:3000/ へのリクエストだけが送信されます（ハッシュ部分は送られません）。
// サーバーは常に index.html を返し、React アプリが起動してハッシュ部分を解析し、対応するコンポーネントをレンダリングします。（GPT)

export default function Main() {
    return (
        <HashRouter>
            <RouterContent />
        </HashRouter>
    );
}

function RouterContent() {
    // const navigate = useNavigate(); // ページ自動遷移用
    // useEffect(() => {
    //     navigate("/");
    // }, []);
    return (
        <Grid container>
            {/* 左側 */}
            <Grid item xs={3}>
                <Box
                    sx={{
                        height: "100vh", // 全画面の高さ
                        backgroundColor: "#f0f0f0", // 背景色
                        padding: 2
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        メニュー
                    </Typography>
                    <Box>
                        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "10px" }}>
                            トップ
                        </Link>
                        <Link to="/Guide" style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "10px" }}>
                            あそびかた
                        </Link>
                        <Link to="/Gallery" style={{ textDecoration: "none", color: "inherit", display: "block", marginBottom: "10px" }}>
                            犬一覧
                        </Link>
                    </Box>
                </Box>
            </Grid>

            {/* 右側のコンテンツ */}
            <Grid item xs={9}>
                <Box sx={{ padding: 4 }}>
                    <Routes>
                        <Route path="/" element={<Top />} />
                        <Route path="/Guide" element={<Guide />} />
                        <Route path="/Result" element={<Result />} />
                        <Route path="/Gallery" element={<Gallery />} />
                    </Routes>
                </Box>
            </Grid>
        </Grid>
    );
}
