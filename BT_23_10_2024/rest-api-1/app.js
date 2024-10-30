const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware để xử lý dữ liệu JSON trong request

// Tạo endpoint GET để trả về danh sách người dùng
app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ]);
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
