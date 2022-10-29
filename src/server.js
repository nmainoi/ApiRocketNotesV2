require("express-async-errors");

const AppErro = require("./utils/AppError");

const express = require("express")

const migrationRun = require("./database/sqlite/migrations");

const routes = require("./routes");

const app = express();

migrationRun();

app.use(express.json());

app.use(routes);


app.use((err, req, res, next) => {

    if(err instanceof AppErro){
        return res.status(err.statusCode).json({error: err.message});
    }
    else {
        console.log(err)
        return res.status(500).json({error: "Internal Server Error"});
    }
    
})
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});