pipeline {
    agent any
    stages {
        stage("Checkout"){
            steps{
                checkout scm
            }
        }
        
        stage("Test"){
            steps{      
                
                withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | sudo -S apt-get update'
                    sh 'echo $PASSWORD | sudo -S apt-get install nodejs npm | echo Y'
                    //sh 'echo $PASSWORD | sudo -S apt-get install -y docker.io'
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
            steps{
                sh 'echo $PASSWORD | sudo docker build -t node-express-api:1.0 .'
            }
        }
    }
}