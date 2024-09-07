const express = require("express")
const status = require("./status_codes")
const data = require("./data")

const app = express()

const port = process.env.PORT || 3000

// app.get("/", (req, res) => {
//     res.status(status.HTTP_200_OK).send("<h1>Hello World</h1>. <h3>Welcome to our home page</h3>")
// })

// app.get("/about", (req, res) => {
//     res.status(status.HTTP_200_OK).send("About page")
// })

app.use(express.json())
// app.use("/items", express.urlencoded({extended: true}))

app.get("/search", (req, res) => {
    console.log(req);

    console.log(req.query);

    const { name, age } = req.query
    const obj = data.filter((d) => d.name === name)

    res.send(`Searching for name: ${obj[0].name}`)
})

app.get("/items/:id", (req, res) => {
    //console.log(req.params.id)
    const id = req.params.id

    const item = data.filter(obj => obj.id == Number(id))

    res.send(`${item[0].name} retrieved successfully`)
})

app.post("/items", (req, res) => {

    if (!req.body) {
        res.status(status.HTTP_422_UNPROCESSABLE_ENTITY).json({ status: 422, message: "Please provide the correct JSON data" })
    }

    const newItem = req.body
    data.push(newItem)

    res.status(status.HTTP_201_CREATED).json({ status: 201, message: "Item created successfully", data: newItem })
})

app.delete("/items/:id", async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id

    const item = await data.filter(obj => obj.id === Number(id))
    console.log(item);

    if (item.length < 1) {
        res.status(status.HTTP_404_NOT_FOUND).json({ status: 404, message: "Item does not exist" })
    }

    data.pop(item)

    res.status(status.HTTP_204_NO_CONTENT).json({})
})


app.put("/items/:id", async (req, res) => {
    const id = req.params.id
    const item = await data.filter(obj => obj.id === Number(id))

    if (!req.body) {
        res.status(status.HTTP_422_UNPROCESSABLE_ENTITY).json({ status: 422, message: "Please provide the correct JSON data" })
    }

    item[0].name = req.body.name
    item[0].price = req.body.price
    item[0].color = req.body.color

    res.status(status.HTTP_200_OK).json({ status: 200, message: "Item updated successfully", data: item })
})


app.patch("/items/:id", async (req, res) => {
    const id = req.params.id
    const item = await data.filter(obj => obj.id === Number(id))

    if (!req.body) {
        res.status(status.HTTP_422_UNPROCESSABLE_ENTITY).json({ status: 422, message: "Please provide the correct JSON data" })
    }

    item[0].name = req.body.name

    res.status(status.HTTP_200_OK).json({ status: 200, message: "Item updated successfully", data: item })
})




app.all("*", (req, res) => {
    res.status(status.HTTP_404_NOT_FOUND).send("Cannot find the resource you are trying to access")
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
})

//app.get
//app.post
//app.put
//app.patch
//app.delete
//app.use
//app.all
//app.listen