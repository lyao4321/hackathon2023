# Use an official Python runtime as the parent image
FROM python:3.8-slim-buster as backend

WORKDIR /backend
COPY app.py .

RUN pip install flask

# Use node as the parent image for frontend
FROM node:14 as frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final image combining both
FROM python:3.8-slim-buster

WORKDIR /app
COPY --from=backend /backend /backend
COPY --from=frontend-build /frontend/build /frontend

# Set flask environment variables
ENV FLASK_APP=/backend/app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Install necessary packages and libraries
RUN pip install flask

EXPOSE 5000

CMD ["flask", "run"]
