const status = require("./status_codes")
const items = require("./database")

const fetchItems = (req, res) => {
    console.log(req.headers["authorization"].split(" ")[0]);

    if (req.isAuthenticated) {
        res.status(status.HTTP_200_OK).json({ status: 200, message: "Items retrieved successfully", data: items })
    }
    else {
        res.status(status.HTTP_403_FORBIDDEN).json({ status: HTTP_403_FORBIDDEN, message: "you are not authenticated" })
    }  
}

const searchItems = (req, res) => {
    console.log(req.query);
    const { is_completed } = req.query

    if (!is_completed) {
        res.send(items)
    }

    const filteredItems = items.filter(obj => obj.is_completed == Boolean(is_completed))
    console.log(filteredItems);

    if (filteredItems.length === 0) {
        console.log("404 not found");
        return res.status(status.HTTP_404_NOT_FOUND).json({ status: 404, message: "filteredItems not found" })
    }
    return res.status(status.HTTP_200_OK).json({ status: 200, data: filteredItems })
}

const fetchOneItem = (req, res) => {
    const { id } = req.params

    const item = items.find(item => item.id === Number(id))
    if (!item) {
        res.status(status.HTTP_404_NOT_FOUND).json({ status: 404, message: "Items not found" })
    }
    res.status(status.HTTP_200_OK).json({ status: 200, data: item })
}

module.exports = {
    fetchItems, searchItems, fetchOneItem
}