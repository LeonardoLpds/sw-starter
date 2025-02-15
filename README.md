# Star Wars API App
This is a full-stack application built with React (frontend) and Laravel (backend). It allows users to search for Star Wars characters and movies using the Star Wars API. Statistics about search queries are computed every 5 minutes and made available via an API endpoint.
## Requirements
- Docker
- Docker Compose

### Build and run the Docker containers
After cloning the repository, execute the following command in the project's root directory to build and start the containers:
```bash
docker-compose up --build
```

### Access the application
To access the app, open your browser and go to:
http://localhost:5173

To access the statistics JSON data, visit:
http://localhost:8000/api/statistics
