import React from 'react';
import { Typography, Container, Card, CardContent, Box, Button } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import { Navigate } from 'react-router';
import Top from './Top';
import { useNavigate } from "react-router-dom";

export default function Guide() {
    const navigate = useNavigate();
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                    {/* Title Section */}
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        あそびかた
                    </Typography>

                    {/* Introduction */}
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                        トップページから画像をスライドしてお気に入りの犬を見つけましょう。
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                        良いと思ったものは
                        <Box component="span" sx={{ alignItems: 'center' }}>
                            <SwipeRightIcon sx={{ mx: 0.5 }} />右へドラッグ＆ドロップ
                        </Box>
                        。微妙...ってものは
                        <Box component="span" sx={{ alignItems: 'center' }}>
                            <SwipeLeftIcon sx={{ mx: 0.5 }} />左へドラッグ＆ドロップ
                        </Box>
                        してください。
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
                        良いと思った画像を12こ選ぶと、あなたが一番気に入っている犬の種類がわかります。
                    </Typography>


                    <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        注意
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ lineHeight: 1.6 }}>
                        スマートフォンでは画像のスライドに対応していないため、ボタンでの操作のみ可能になります。
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ lineHeight: 1.6 }}>
                        アンケートとかとれたら、もっと正確に好みのわんこを結果としてお伝えできるのですが時間がありませんでした！
                    </Typography>

                    {/* Button Section */}
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#333', // ダークグレー
                            color: '#fff', // 文字色は白
                            padding: '10px 20px',
                            fontSize: '16px',
                            '&:hover': {
                                backgroundColor: '#444', // ホバー時の色調整
                            },
                        }}
                        onClick={() => {navigate('/')}}>
                            トップページへ戻る
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
