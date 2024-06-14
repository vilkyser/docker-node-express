pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "node-express-api"
        IMAGE_TAG = "1.0"
        DOCKER_REGISTRY = "docker.mcjimleather.com:9000"
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
                withCredentials([usernamePassword(credentialsId: 'docker_cred_id', usernameVariable: 'REGISTRY_USERNAME', passwordVariable: 'REGISTRY_PASSWORD')]) {
                    script {
                        sh """
                            echo $REGISTRY_PASSWORD | docker login -u $REGISTRY_USERNAME --password-stdin ${DOCKER_REGISTRY}
                            docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                            docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                        """
                    }
                }
            }
        }
    }
}
