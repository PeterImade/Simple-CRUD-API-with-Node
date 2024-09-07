const http = require("http"); 
const status = require('./status_codes')
const items = require('./data')



// Auto-Increment ID
let currentId = items[items.length - 1].id;

// Helper function

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = ''
        req.on('data', (obj) => {
            body += obj.toString()
        });

        req.on('end', () => {
            resolve(body ? JSON.parse(body) : {});
        });

        req.on('error', (err) => {
            reject(err);
        })
    })
}

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Getting all items
    if (req.method === 'GET' && req.url === '/items') {
        res.writeHead(status.HTTP_200_OK);
        res.end(JSON.stringify(items))
    }
    // Getting an item
    else if (req.method === 'GET' && req.url.startsWith('/items/')) {
        const id = Number(req.url.split('/')[2])
        const item = items.find(i => i.id === id)
        if (item) {
            res.writeHead(status.HTTP_200_OK)
           // res.end({status: status.HTTP_200_OK, data: JSON.stringify(item), message: `${item.name} retrieved successfully` })
            res.end(JSON.stringify(item))
        } else {
            res.writeHead(status.HTTP_404_NOT_FOUND)
            res.end(JSON.stringify({ message: 'Item not found' }))
        }
    }
    // Creating an item
    else if (req.method === "POST" && req.url === '/items') {
        try {
            const body = await getRequestBody(req);
            if (!body) {
                res.writeHead(status.HTTP_422_UNPROCESSABLE_ENTITY)
                res.end(JSON.stringify({ status: status.HTTP_422_UNPROCESSABLE_ENTITY, message: "Unprocessible data" }))
            }
            const newItem = { id: ++currentId, ...body }
            items.push(newItem)
            res.writeHead(status.HTTP_201_CREATED)
            res.end(JSON.stringify(newItem))
        } catch (error) {
            res.end(status?.HTTP_500_INTERNAL_SERVER_ERROR)
            res.end(JSON.stringify({ message: error?.message }))
        }
    }

    else if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
        const id = Number(req.url.split('/')[2])
        const index = items.findIndex(i => i.id === id)
        if (index !== -1) {
            items.splice(index, 1);
            res.writeHead(status.HTTP_204_NO_CONTENT)
            res.end()
        } else {
            res.writeHead(status.HTTP_404_NOT_FOUND)
            res.end(JSON.stringify({ message: "Item not found" }))
        }
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})