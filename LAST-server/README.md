## Installing
Make sure you have
  1. MongoDB installed with `mongo daemon` running
  2. MongoDB has a DB running according to the file `datasources.json`

## Running
Run `npm run start`

## Getting started with Docker Compose
(make sure you have docker-compose installed)
simply run `docker-compose up`

## Getting started with Minikube and Kubectl
(make sure you have installed minikube and kubectl)
run kompose up
`kompose --file kompose.yml up`

make sure you have minikube running
create an open port to communicate with 
`kubectl expose deployment last-server --type=NodePort --name=last-server-gateway`

go to the service port
`minikube service last-server-gateway`

view deployments on a minikube dashboard
`minikube dashboard`

try to arbitrarily scale service
`kubectl scale deployments/last-server --replicas=4`

//NOTE: to run in kompose- change tag in docker-compose.yml file to `last-server:kube` instead of `:compose` and commentout out `volume` section inside docker-compose.yml