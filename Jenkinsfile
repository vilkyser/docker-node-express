pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "node-express-api"
        IMAGE_TAG = "1.2"
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
                script {
                    withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "sudo apt-get update"
                        sh "sudo apt-get install nodejs npm -y"
                        sh "sudo npm install -g mocha"
                        sh "npm test"
                    }
                }
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }

        stage("Build and Create Docker Image") {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage("Push Image to Docker Registry") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_cred_id', usernameVariable: 'REGISTRY_USERNAME', passwordVariable: 'REGISTRY_PASSWORD')]) {
                        sh "docker login -u $REGISTRY_USERNAME -p $REGISTRY_PASSWORD"
                        sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}:${IMAGE_TAG}"
                        sh "docker push ${DOCKER_REGISTRY}:${IMAGE_TAG}"
                        sh "docker logout"
                    }
                }
            }
        }
    }
}
