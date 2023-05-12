# node-docker
RESTful Web Service + Docker

## Build and Run
```
docker build -t harshaky/node-docker:1.0 .
```

```
docker run -p 3000:3000 <image_id> 
```

## About
This is a simple RESTful web service that returns a JSON object with customers and their orders. It is built using Node.js and Express.js. The data is stored in a JSON file. The web service is containerized using Docker.

## Endpoints
### Customers
```
GET /customers
```
Returns a JSON object with all customers and their orders.

```
GET /customers/:id
```
Returns a JSON object with a specific customer and their orders.

### Orders
```
GET /customers/:id/orders
```
Returns a JSON object with all orders for a specific customer.

```
GET /customers/:id/orders/:orderId
```
Returns a JSON object with a specific order for a specific customer.
