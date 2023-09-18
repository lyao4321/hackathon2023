# Use an official Python runtime as the parent image
FROM python:3.8-slim-buster as backend

WORKDIR /backend
COPY ./backend/ .

# Use node as the parent image for frontend
FROM node:14 as frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./

# Final image combining both
FROM python:3.8-slim-buster

# Copy Flask application and React build
WORKDIR /backend
COPY --from=backend /backend /backend
COPY --from=frontend-build /frontend /frontend
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Set flask environment variables
ENV FLASK_APP=/backend/server.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8080

EXPOSE 8080

CMD ["python", "-u", "-m", "flask", "run"]

