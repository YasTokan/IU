const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express()
require("./config/database").connect();

const productsRoute = require("./api/routes/products.routes")
const ordersRoute = require("./api/routes/orders.routes")
const userRoute = require("./api/routes/user.routes")
const categoryRoute = require("./api/routes/category.routes")
const subcategoryRoute = require("./api/routes/subCategory.routes")
const secSubcategoryRoute = require("./api/routes/secSubCategory.routes")
const filterRoute = require("./api/routes/filter.routes")
const filterItemRoute = require("./api/routes/filterItem.routes")
const itemRoute = require("./api/routes/item.routes")


const currencyRoute = require("./api/routes/global/currency.routes")

app.use(morgan("dev"))

app.use('/uploads', express.static('uploads'));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})



app.use("/currency", currencyRoute);



app.use("/products", productsRoute);
app.use("/orders", ordersRoute);

app.use("/auth", userRoute);

app.use("/category", categoryRoute);
app.use("/subCategory", subcategoryRoute);
app.use("/secSubCategory", secSubcategoryRoute);

app.use("/filter", filterRoute);
app.use("/filterItem", filterItemRoute);

app.use("/item", itemRoute);


app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404

    next(error)
})

app.use((error, req, res, next) => {

    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app