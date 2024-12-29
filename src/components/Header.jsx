import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#777' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* ロゴやタイトル */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
            わんこをさがそう！
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
