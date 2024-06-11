pipeline {
    agent any
    stages {
        stage("checkout"){
            steps{
                checkout scm
            }
        }
        
        stage("Test"){
            steps{      
                
                // sh 'sudo apt-get update'
                // sh 'sudo apt-get git'
                    // sh 'sudo apt-get install nodejs'          
                    // sh 'sudo apt-get install npm'
                    // sh 'npm test'

                withCredentials([usernamePassword(credentialsId: 'jenkins_cred_id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                // available as an env variable, but will be masked if you try to print it out any which way
                // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
                sh 'echo $PASSWORD'
                // also available as a Groovy variable
                echo USERNAME
                // or inside double quotes for string interpolation
                echo "username is $USERNAME"

                sh 'echo $PASSWORD | sudo -S apt-get install npm'
                sh 'echo $PASSWORD | sudo -S npm test'

                }
            }
        }

        stage("Build"){
            steps{
                sh 'npm run build'
                
            }
        }
    }
}