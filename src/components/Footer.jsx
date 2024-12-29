import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" gutterBottom>
        日本大学文理学部情報科学科 Webプログラミング最終課題<br />
        5423041 長谷川絢南
        </Typography>
      </Container>
    </Box>
  );
}