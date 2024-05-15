# StudyStorm Educational Platform

This repository contains the microservices for the Educational Platform project. The project is designed to provide RESTful web services for managing users, courses, and content delivery, following the microservices architecture principles. Docker and Kubernetes are used for containerization and orchestration, respectively.

## Technologies Used

- Node.js
- Express.js
- React.js
- SpringBoot
- Docker
- Kubernetes

## Microservices

1. **User Service**: Manages user authentication and authorization.

2. **Course Service**: Handles course management functionalities such as creating, updating, and deleting courses.

3. **Course Service**: Handles course management functionalities such as creating, updating, and deleting courses.

4. **Course Service**: Handles course management functionalities such as creating, updating, and deleting courses.

## Getting Started

### Prerequisites

- Node.js and npm installed locally
- Docker Desktop (for local development)
- Kubernetes cluster (for production deployment)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SLIITStudyStorm/StudyStorm.git
   ```

2. Setup docker:

   ```bash
   docker pull mysql
   docker pull mongo   
   ```

### Usage

1. Build Docker images for each microservice and frontend:

   ```bash
   docker compose build
   ```

2. Run Docker container cluster:

   ```bash
   docker compose up
   ```

3. Access the system via :

   - `http://localhost:3000`
   

### Deployment

1. Set up a Kubernetes cluster (e.g., using Minikube or a cloud provider).
2. Deploy the microservices to the Kubernetes cluster using Kubernetes deployment YAML files.
3. Expose necessary services using Kubernetes services.
4. Configure environment variables for the microservices to connect with each other and with the database.
5. Test the deployed application to ensure everything is working as expected.

