@echo off
echo Deploying MongoDB Persistent Volume Claim...
kubectl apply -f mongo-pvc.yaml

echo Deploying MongoDB Service and Deployment...

kubectl apply -f mongo-deployment.yaml

echo Deploying Backend Service and Deployment...

kubectl apply -f backend-deployment.yaml

echo Deploying Frontend Service and Deployment...

kubectl apply -f frontend-deployment.yaml

echo Kubernetes Deployment Completed.
