@echo off
echo Deploying MongoDB Persistent Volume Claim...
kubectl apply -f mongo-data-persistentvolumeclaim.yaml

echo Deploying MongoDB Service and Deployment...
kubectl apply -f mongodb-service.yaml
kubectl apply -f mongodb-deployment.yaml

echo Deploying Backend Service and Deployment...
kubectl apply -f backend-service.yaml
kubectl apply -f backend-deployment.yaml

echo Deploying Frontend Service and Deployment...
kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-deployment.yaml

echo Kubernetes Deployment Completed.
