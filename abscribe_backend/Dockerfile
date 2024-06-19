# Backend Dockerfile
FROM python:3.12.2

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP=abscribe_backend/app.py

CMD ["flask", "run", "--host=0.0.0.0"]
