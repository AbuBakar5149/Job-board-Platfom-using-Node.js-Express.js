const express = require ('express');
const jobRoutes=require('./routes/jobRoutes');
const sequelize = require('./db/db');

const app = express();
const PORT= 6000;
app.use(express.json());
app.use('/api',jobRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));   
sequelize.sync({alter:true}).then(()=>{
    console.log("Database has been synchronize");
}).catch((error)=>{
    console.error('Error synchronizing the database', error);
})
app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`);
})
