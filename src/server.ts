import app from './index';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`MyLIST server berjalan di http://localhost:${PORT}`);
});
