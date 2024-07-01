# Use a lightweight Python image
FROM python:3.12.2-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application code
COPY . .

# Set environment variables
ENV FLASK_APP=abscribe_backend/app.py

# Expose port 8080
EXPOSE 8080

# Use Gunicorn to serve the application
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "abscribe_backend.app:app"]
