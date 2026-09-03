# OmniStock Retail

OmniStock Retail is a full-stack Multi-Warehouse Inventory Control Platform built using a microservices architecture. It tracks stock across multiple warehouses, manages a product catalog, and orchestrates order placement with automatic stock decrementing using a Saga pattern.

## Architecture

The system is composed of several independent Spring Boot microservices, communicating via Spring Cloud OpenFeign and coordinated through Netflix Eureka and a Spring Cloud Gateway.

- **Discovery Service (Eureka)**: Service registry (`:8761`)
- **API Gateway**: Single public entry point with JWT validation (`:8080`)
- **Auth Service**: Manages users and issues RS256 JWTs (`:8081`)
- **Product Service**: Manages the product catalog (`:8082`)
- **Inventory Service**: Tracks stock per warehouse using optimistic locking (`:8083`)
- **Order Service**: Orchestrates orders using Saga and Resilience4j (`:8084`)

The frontend is a React 18 SPA built with Vite, Tailwind CSS, and shadcn/ui.

## Prerequisites

- Docker and Docker Compose
- Node.js (v18+) for running the frontend locally

## Setup & Running the System

1. **Build and start the backend microservices**
   ```bash
   docker-compose up --build
   ```
   *Note: This will spin up Postgres, Eureka, API Gateway, and the four business microservices. It may take a few minutes for all services to register with Eureka and become fully available.*

2. **Start the Frontend**
   Open a new terminal, navigate to the `frontend` directory, and start the Vite dev server:
   ```bash
   cd frontend
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173`.*

## Testing the Full Flow

1. Go to `http://localhost:5173` and register a new user as a **MANAGER**.
2. Log in with the newly created credentials.
3. **Products Page**: Add a new product (e.g., SKU: `TEST1`, Name: `Demo Product`, Price: `19.99`). Note the Product ID.
4. **Inventory Page**: Select a warehouse, enter the Product ID, and replenish stock (e.g., add `100` units).
5. **Orders Page**: Place a new order for the Product ID and Warehouse ID. Submit the order.
6. Check the Inventory Page again to see the stock decrement correctly.
7. To test failure: Try placing an order for more stock than is available. The system will throw an insufficient stock error, and the UI will reflect the order failure.

## Troubleshooting

- If a service fails to start immediately due to database unavailability, docker-compose will automatically restart it.
- Ensure ports `8080-8084`, `8761`, `5432`, and `5173` are available on your machine.
