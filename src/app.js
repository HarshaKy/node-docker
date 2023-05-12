const express = require('express');
const app = express();
const db = require('./db/db.json');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home', { title: 'Home', message: 'Welcome to my node-docker app!' });
}
);

app.get('/view/customers', (req, res) => {
    fetch('http://localhost:3000/customers')
        .then(res => res.json())
        .then(customers => {
            res.render('customers', { title: 'Customers', customers: customers });
        })
        .catch(err => {
            res.redirect('/');
        });
}
);

app.get('/customers', (req, res) => {
    res.json(db.customers);
}
);

app.get('/view/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fetch(`http://localhost:3000/customers/${id}`)
        .then(res => res.json())
        .then(customer => {
            res.render('customer', { title: 'Customer', customer: customer });
        })
        .catch(err => {
            res.redirect('/');
        });
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

app.get('/view/customers/:id/orders', (req, res) => {
    const id = parseInt(req.params.id);
    fetch(`http://localhost:3000/customers/${id}/orders`)
        .then(res => res.json())
        .then(orders => {
            res.render('orders', { title: 'Orders', orders: orders });
        })
        .catch(err => {
            res.redirect('/');
        });
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

app.get('/view/customers/:id/orders/:orderId', (req, res) => {
    const id = parseInt(req.params.id);
    const orderId = parseInt(req.params.orderId);
    fetch(`http://localhost:3000/customers/${id}/orders/${orderId}`)
        .then(res => res.json())
        .then(order => {
            res.render('order', { title: 'Order', order: order });
        })
        .catch(err => {
            res.redirect('/');
        });
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
