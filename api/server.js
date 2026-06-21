const express = require('express');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

// 100% Direct High-Speed Stream Route (No timeouts)
app.get('/download', async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).send('URL is required');

    try {
        // වීඩියෝ තොරතුරු ඉක්මනින් ලබා ගැනීම
        const info = await ytdl.getBasicInfo(videoUrl);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '') || 'video';

        // බ්‍රවුසර් එකට කෙලින්ම ෆයිල් එකක් විදිහට බාගත කරගන්න අණ කිරීම
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        res.header('Content-Type', 'video/mp4');

        // YouTube එකේ සිට කෙලින්ම යූසර්ගේ බ්‍රවුසර් එකට වීඩියෝව ගලාගෙන යාම (Live Pipe Stream)
        ytdl(videoUrl, {
            format: 'mp4',
            quality: 'highestvideo',
            filter: 'audioandvideo'
        }).pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Download processing error');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});