const express = require('express');
const path = require('path');
const app = express();

// ප්‍රධාන ෆෝල්ඩර් එකේ (Root) තියෙන index.html එක නිවැරදිව පෙන්වීමට මඟ සැකසීම
app.use(express.static(path.join(__dirname, '..')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = app;

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}