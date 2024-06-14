pipeline {
    agent any
    
    environment{
        IMAGE_NAME = "node-express-api"
        IMAGE_TAG = "1.0"
        DOCKER_REGISTRY = "docker.mcjimleather.com:9000"
    }

    stages {
        stage("Checkout"){
            steps{
                checkout scm
            }
        }
        
        stage("Test"){
            steps {      
                
                withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | sudo -S apt-get update'
                    sh 'echo $PASSWORD | sudo -S apt-get install nodejs npm | echo Y'
                    sh 'echo $PASSWORD | sudo -S npm install -g mocha'
                    sh 'echo $PASSWORD | sudo -S npm test'
                }
            }
        }

        stage("Build"){
            steps{
                sh 'npm run build'
                
            }
        }

        stage("Build and Create Docker Image"){
            steps {

                withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                sh 'echo $PASSWORD | sudo -S docker build -t ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} .'
                }
            }
        }

        // stage("Push Image to Docker Registry"){
        //     steps{
        //         //   withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
        //         //      withCredentials([usernamePassword(credentialsId: 'docker_cred_id', usernameVariable: 'REGISTRY_USERNAME', passwordVariable: 'REGISTRY_PASSWORD')]) {
        //         //            sh '''
        //         //                 echo $PASSWORD | sudo -S docker login -u $REGISTRY_USERNAME --password-stdin ${DOCKER_REGISTRY}
        //         //                 echo $REGISTRY_PASSWORD | sudo -S docker login -u $REGISTRY_USERNAME --password-stdin ${DOCKER_REGISTRY}
        //         //                 docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
        //         //                 docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
        //         //           '''
        //         //      }
                    
        //         // }
                
        //         withCredentials([usernamePassword(credentialsId: 'docker_cred_id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
        //             withDockerRegistry([credentialsId: 'docker_cred_id', url: "http://docker.mcjimleather.com"]) {
        //                 // Push the Docker image
        //                 docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
        //             }
        //         }
                
        //     }   
        // }
    }
}