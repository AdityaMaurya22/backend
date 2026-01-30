//server ko start karna or db se connect karna


const app = require('./src/app.js')
require('dotenv').config();

const connectDB = require('./src/config/database.js')

connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})