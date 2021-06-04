# Backend Development

#### Prerequisite

* `node:` `14.x.x`
* `npm:` `6.x.x`


#### How to run

* `git clone https://github.com/Bangkit-Capstone-Project-Team/Backend-Development.git`
* `cd backend-development`
* `npm install`
* (optional based on your local env) `cp .env.example .env`
* `node ace serve --watch`
* Open your localhost based on port

#### Documentation
* You can try it in here : https://capstone-b21-cap026.herokuapp.com/
* Or check the documentation : https://capstone-b21-cap026.herokuapp.com/docs

![image](https://user-images.githubusercontent.com/48268441/120738641-65a3fe80-c51a-11eb-9de6-5fd2260a25f4.png)


#### How To Deploy at GCP using Cloud Run
1. Upload images to google cloud using cloud sdk. make sure you have installed it first. read this documentation https://cloud.google.com/container-registry/docs/pushing-and-pulling
2. Open gcp, then click cloud run menu. Then select Create Service
3. Enter your service name, select region, then next
4. Enter the container URL or select the container you have used by clicking SELECT
5. And then click Create
6. Done~


