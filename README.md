# Node JS Backend Development

#### Prerequisite

* 'node:' '14.x.x'
* 'npm:' '6.x.x'


#### How to run

* 1. 'git clone https://github.com/Bangkit-Capstone-Project-Team/Backend-Development.git'
* 2. 'cd backend-development'
* 3. 'npm install'
* 4. (optional based on your local env) 'cp .env.example .env'
* 5. 'node ace serve --watch'
* 6. Open your localhost based on port

#### Documentation
* You can try it in here : https://capstone-b21-cap026.herokuapp.com/
* Or check the documentation : https://capstone-b21-cap026.herokuapp.com/docs

#### How To Deploy at GCP using Cloud Run
1. Upload images to google cloud using cloud sdk. make sure you have installed it first. read this documentation https://cloud.google.com/container-registry/docs/pushing-and-pulling
2. Open gcp, then click cloud run menu. Then select Create Service
3. Enter your service name, select region, then next
4. Enter the container URL or select the container you have used by clicking SELECT
5. And then click Create
6. Done~


