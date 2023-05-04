const express = require('express');
const app = express();
const db = require('./db/db.json');

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
}
);

app.get('/customers', (req, res) => {
    res.json(db.customers);
}
);

app.get('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const customer = db.customers.find(customer => customer.id === id);
    
    if (!customer) {
        res.status(404).send('The customer with the given ID was not found.');
        return;
    }
    res.json(customer);
}
);

app.get('/customers/:id/orders', (req, res) => {
    const id = parseInt(req.params.id);
    const customer = db.customers.find(customer => customer.id === id);

    if (!customer) {
        res.status(404).send('The customer with the given ID was not found.');
        return;
    }
    res.json(customer.orders);
}
);

app.get('/customers/:id/orders/:orderId', (req, res) => {
    const id = parseInt(req.params.id);
    const orderId = parseInt(req.params.orderId);
    const customer = db.customers.find(customer => customer.id === id);

    if (!customer) {
        res.status(404).send('The customer with the given ID was not found.');
        return;
    } else {
        const order = customer.orders.find(order => order.id === orderId);
        if (!order) {
            res.status(404).send('The order with the given ID was not found.');
            return;
        }
        res.json(order);
    }
}
);

app.get('*', (req, res) => {
    res.status(404).send('404 Not Found');
}
);

app.listen(3000, () => {
    console.log('My node-docker app is running on port 3000!');
}
);
