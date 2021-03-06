Basic kubernetes:
-------------------
gcloud container clusters get-credentials my-cluster --zone us-central1-c
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
  kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.46.0/deploy/static/provider/cloud/deploy.yaml 
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

enabling cloud build:
---------------------
gcloud auth application-default login
gcloud iam service-accounts create ticketing-dev
gcloud services enable cloudbuild.googleapis.com

gcloud projects add-iam-policy-binding ticketing-dev-315608 --member="serviceAccount:ticketing-dev@ticketing-dev-315608.iam.gserviceaccount.com" --role="roles/owner"
gcloud iam service-accounts keys create gcloud.json --iam-account=ticketing-dev@ticketing-dev-315608.iam.gserviceaccount.com
url for creating cloud build credes: https://cloud.google.com/docs/authentication/production
port forward with kubectl:
----------------------------
kubectl port-forward nats-depl-6777bbb7b4-q4nrh  4222:4222
