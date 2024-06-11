pipeline {
    agent any
    stages {
        stage("Checkout "){
            steps{
                checkout scm
            }
        }
        
        stage("Test"){
            steps{
                sh 'sudo apt install npm'
                sh 'npm test'
            }
        }

        state("Build"){
            steps{
                sh 'npm run build'
                
            }
        }
    }
}