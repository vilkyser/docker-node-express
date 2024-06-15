pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "node-express-api"
        IMAGE_TAG = "1.0"
        DOCKER_REGISTRY = "jenkins-apps/${IMAGE_NAME}" // Update with your Docker repository URL
        DOCKER_HOST = "tcp://192.168.1.89:9000" // Update with your Docker host IP where Portainer is running
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
            }
        }
        
        stage("Test") {
            steps {      
                // Your existing test steps here
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
                script {
                    def dockerfile = '''
                        FROM node:14-alpine
                        WORKDIR /app
                        COPY . .
                        RUN npm install --production
                        EXPOSE 3000
                        CMD ["npm", "start"]
                    '''
                    writeFile file: 'Dockerfile', text: dockerfile
                    
                    // Build Docker image using YADP
                    yadpBuildImage registryCredentialsId: 'docker_cred_id',
                                  dockerHost: "${DOCKER_HOST}",
                                  imageName: "${DOCKER_REGISTRY}:${IMAGE_TAG}",
                                  dockerfilePath: 'Dockerfile'
                }
            }
        }

        stage("Push Image to Docker Registry") {
            steps {
                script {
                    // Push Docker image to registry using YADP
                    yadpPushImage registryCredentialsId: 'docker_admin_cred',
                                 dockerHost: "${DOCKER_HOST}",
                                 imageName: "${DOCKER_REGISTRY}:${IMAGE_TAG}"
                }
            }
        }
    }
}
