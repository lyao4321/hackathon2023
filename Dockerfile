# Use an official Python runtime as the parent image
FROM python:3.12-slim-buster as backend

WORKDIR /backend
COPY ./backend/server.py .


# Use node as the parent image for frontend
FROM node:14 as frontend-build

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final image combining both
FROM python:3.12-slim-buster

# Copy Flask application and React build
WORKDIR /backend
COPY --from=backend /backend /backend
COPY --from=frontend-build /frontend/build /frontend
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Set flask environment variables
ENV FLASK_APP=/backend/server.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8080

EXPOSE 8080

CMD ["python", "-m", "flask", "run"]

