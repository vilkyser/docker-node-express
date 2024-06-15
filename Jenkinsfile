pipeline {
    agent any

    environment {
        IMAGE_NAME = "node-express-api"
        IMAGE_TAG = "1.0"
        DOCKER_REGISTRY = "jenkins-apps/${IMAGE_NAME}"
        DOCKER_HOST = "tcp://192.168.1.89:9000"
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

                    // Set Docker host environment variable
                    sh "export DOCKER_HOST=${DOCKER_HOST}"

                    // Build Docker image using standard Docker commands
                    sh "docker build -t ${DOCKER_REGISTRY}:${IMAGE_TAG} -f Dockerfile ."
                }
            }
        }

        stage("Push Image to Docker Registry") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker_admin_cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin ${DOCKER_HOST}"
                        sh "docker push ${DOCKER_REGISTRY}:${IMAGE_TAG}"
                    }
                }
            }
        }
    }
}
