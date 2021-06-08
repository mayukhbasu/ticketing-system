Basic kubernetes:
-------------------
gcloud container clusters get-credentials ticketing-dev
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.46.0/deploy/static/provider/cloud/deploy.yaml 
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

enabling cloud build:
---------------------
gcloud iam service-accounts create ticketing-dev
gcloud services enable cloudbuild.googleapis.com

gcloud projects add-iam-policy-binding ticketing-dev-315608 --member="serviceAccount:ticketing-dev@ticketing-dev-315608.iam.gserviceaccount.com" --role="roles/owner"
gcloud iam service-accounts keys create gcloud.json --iam-account=ticketing-dev@ticketing-dev-315608.iam.gserviceaccount.com

port forward with kubectl:
----------------------------
kubectl port-forward nats-depl-699fd76bff-n5b9x 4222:4222
