curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
#Or use this for detailed view of version:
`kubectl version --client --output=yaml`
kubectl version --client --output=yaml
kubectl run nginx --image=nginx
kubectl get nodes
#To access additional node information
kubectl get nodes -o wide 
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256"
echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
#Or use this for detailed view of version:
`kubectl version --client --output=yaml`
sudo apt update
sudo curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install
aws --version
aws configure
`kubectl version --client --output=yaml`
aws --version
aws configure
kubectl get service
aws eks --region ca-central-1 update-kubeconfig --name eks-master
kubectl get service
kubectl get node
asw s3 ls
aws s3 ls
mkdir shark
cd shark/
git clone https://github.com/LadyMarg/node_project.git
ls
cd node_project/
touch .env
cd .
touch docker.sh
sh docker.sh
docker login -u marypearl
ls
kubectl create -f db-deployment.yaml,db-env-configmap.yaml,db-service.yaml,dbdata-persistentvolumeclaim.yaml,node-modules-persistentvolumeclaim.yaml,node-modules-pv.yaml,node-modules-pvc.yaml,nodejs-claim0-persistentvolumeclaim.yaml,nodejs-claim0.yaml,nodejs-deployment.yaml,nodejs-env-configmap.yaml,nodejs-pv.yaml,nodejs-service.yaml,pv.yaml,secret.yaml
kubectl get all
kubectl apply -f nodejs-service.yaml
kubectl get svc
curl ip.io

kubectl apply -f k8s_deploy.yaml
