# KV-Store

This is an in-memory key-value store HTTP API service that allows you to perform operations like getting, setting, and searching for keys in a key-value store.

## API Endpoints

- **GET /get/<key>**: Return the value of the specified key.
- **POST /set**: Set a key/value pair in the store.
- **GET /search?prefix=<prefix>**: Search for keys with the specified prefix.
- **GET /search?suffix=<suffix>**: Search for keys with the specified suffix.

## Deployment

### Local Development

1. Clone this repository.
2. Install the required dependencies.
3. Build and run the API service locally.
4. Access the API using `http://localhost:5000`.


## Observability and Monitoring

To monitor the service's health and performance, we have integrated Prometheus metrics.

- **Latency**: Measure the latency of each endpoint.
- **HTTP Status Codes**: Monitor the HTTP status codes returned by each endpoint.
- **Total Keys**: Track the total number of keys in the key-value store.

