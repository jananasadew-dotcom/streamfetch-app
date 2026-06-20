const express = require('express');
const path = require('path');
const app = express();

// Render හෝ වෙනත් Live Hosting එකකින් දෙන Port එකක් පාවිච්චි කිරීම, නැතහොත් 3000 භාවිතය
const PORT = process.env.PORT || 3000;

// index.html ඇතුළු Front-end එක සර්වර් එකට සම්බන්ධ කිරීම
app.use(express.static(path.join(__dirname)));

// සයිට් එකට එන ඕනෑම කෙනෙක්ව ප්‍රධාන පිටුවට (index.html) යොමු කිරීම
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`StreamFetch Server successfully launched on port ${PORT}`);
});