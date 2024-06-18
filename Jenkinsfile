pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "node-express-api"
        IMAGE_TAG = "1.1"
        DOCKER_REGISTRY = "vilkyser/docker-nodejs"
    }
    
    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        
        stage("Test") {
            steps {      
                withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | sudo -S apt-get update'
                    sh 'echo $PASSWORD | sudo -S apt-get install nodejs npm -y'
                    sh 'echo $PASSWORD | sudo -S npm install -g mocha'
                    sh 'echo $PASSWORD | sudo -S npm test'
                }
            }
        }

        stage("Build") {
            steps {
                sh 'npm run build'
            }
        }

        stage("Build and Create Docker Image") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | sudo -S docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
                }
            }
        }

        stage("Push Image to Docker Registry") {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub_cred_id', usernameVariable: 'REGISTRY_USERNAME', passwordVariable: 'REGISTRY_PASSWORD')]) {
                                        
                    sh 'docker login -u $REGISTRY_USERNAME -p $REGISTRY_PASSWORD'
                    sh 'docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}:${IMAGE_TAG}'
                    sh 'docker push ${DOCKER_REGISTRY}:${IMAGE_TAG}'
                    sh 'docker logout'

                }
            }
        }
    }
}
