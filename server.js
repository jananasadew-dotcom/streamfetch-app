const express = require('express');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// Direct Downloading Route
app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).send('URL is required');

    try {
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(videoUrl, {
            format: 'mp4',
            quality: 'highestvideo',
            filter: 'audioandvideo'
        }).pipe(res);
    } catch (error) {
        res.status(500).send('Error processing download');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});