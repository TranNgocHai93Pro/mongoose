const mongoose = require('mongoose');
const express = require('express')
const User = require('./User')
// const uri = 'mongodb://127.0.0.1:27017/bookStore';
const uri = 'mongodb+srv://tranngochai:hai123@cluster0.myhmqqh.mongodb.net/?retryWrites=true&w=majority'
const app = express()

app.use((req, res, next) => {
    // Thiết lập các tiêu đề HTTP cho phép truy cập từ mọi nguồn gốc
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Thiết lập các tiêu đề HTTP cho phép các phương thức HTTP nhất định
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Thiết lập các tiêu đề HTTP cho phép sử dụng các tiêu đề tùy chỉnh
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

mongoose.connect(uri,{ useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

run()
async function run() {
    try{
        const user = await User.findOne({name: 'Mike'})
        await user.save()
        // console.log(user)
    }catch(error) {
        console.log(error.message)
    }
}



// Khởi chạy server và lắng nghe các yêu cầu từ client
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


