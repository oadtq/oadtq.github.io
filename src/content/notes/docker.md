---
title: "Docker"
description: "OS-level virtualization, images vs. containers, Dockerfile and Compose patterns, and the CLI lifecycle — a working reference."
date: 2026-05-28
category: Dev
subcategory: Ops
tags: [docker, devops, reference]
---

**Docker** uses **OS-level virtualization** to package software into **containers**. It shares the host's kernel but isolates the application process.

```text
      USER SPACE                        USER SPACE
+-----------------------+         +-----------------------+
|     Application       |         |      Application      |
+-----------------------+         +-----------------------+
|   Bins/Libraries      |         |    Bins/Libraries     |
+-----------+-----------+         +-----------+-----------+
|     Docker Engine     |         |     Guest OS (Full)   |
+-----------+-----------+         +-----------+-----------+
|    Host OS Kernel     |         |      Hypervisor       |
+-----------+-----------+         +-----------+-----------+
|      Infrastructure   |         |      Infrastructure   |
+-----------------------+         +-----------------------+
     DOCKER CONTAINER                    VIRTUAL MACHINE
```

- **Image:** A read-only, layered snapshot of an environment containing the code, libraries, and config needed to run an app.

- **Container:** A live, isolated instance of an image running as a process on the host machine.

- **Dockerfile:** A script of instructions used to automate the creation of a Docker image.

- **Docker Compose:** A tool for defining and running multi-container applications using a single YAML file.

## Configuration Examples

### Dockerfile

```dockerfile
# 1. Base Image: The foundation of your container
FROM python:3.9-slim

# 2. Workdir: Sets the internal path for all following commands
WORKDIR /app

# 3. Copy: Moves files from Host (left) to Container (right)
COPY requirements.txt .

# 4. Run: Executes commands during the BUILD phase
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy: Moves the rest of the source code
COPY . .

# 6. Expose: Documentation of which port the app listens on
EXPOSE 8080

# 7. CMD: The command executed only when the container STARTS
CMD ["python", "main.py"]
```

### Docker Compose (`docker-compose.yml`)

```yaml
version: '3.8'
services:
  web:
    build: .                 # Use the Dockerfile in the current directory
    ports:
      - "8080:8080"          # Map Host Port : Container Port
    volumes:
      - .:/app               # Hot-reloading: Sync host code with container
    environment:
      - DB_URL=postgres://db # Set environment variables

  db:
    image: postgres:15       # Pull a pre-built image from Docker Hub
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: password

volumes:
  postgres_data:             # Named volume to persist data after shutdown
```

## Workflow & CLI Reference

### Common Commands & Lifecycle

```bash
# --- BUILDING & DISTRIBUTING ---
docker build -t my-app:v1 .      # Build an image with a name (tag)
docker pull                      # Download Docker images from hub to local
docker tag my-app:v1 repo/app:v1 # Tag image for a specific registry
docker push repo/app:v1          # Upload image to the cloud
docker save -o app.tar my-app    # Export image to a file
docker load -i app.tar           # Import image from a file

# --- RUNNING & INSPECTING ---
docker run -d -p 80:80 my-app    # Run in background (detached) with port mapping
docker ps                        # List all running containers
docker exec -it <id> sh          # Enter a running container's shell
docker logs -f <id>              # Follow live logs of a container
docker stop <id>                 # Gracefully shut down a container
docker rm -f <id>                # Force remove a container

# --- DOCKER COMPOSE ---
docker compose up                # Start in foreground mode, stream logs, process stops when the terminal session is terminated
docker compose up -d             # Start the entire stack in background (detached)
docker compose down              # Stop and remove all containers + networks
docker compose restart web       # Restart a specific service
```

### Standard Workflow

1. **Define:** Write a `Dockerfile` for the app and `docker-compose.yml` for dependencies (DB, Redis).

2. **Build:** Run `docker compose build` to bake the environment.

3. **Test:** Use `docker compose up` to run the full stack locally for development.

4. **Ship:** Push the built image to a Registry (like Docker Hub or AWS ECR).

5. **Deploy:** On the server, run `docker pull` and `docker compose up -d`. The code is guaranteed to run exactly as it did in Step 3.
