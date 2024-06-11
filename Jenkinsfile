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
                sh 'sudo apt-get git'
                sh 'sudo apt-get install nodejs'          
                sh 'sudo apt-get install npm'
                sh 'npm test'
            }
        }

        stage("Build"){
            steps{
                sh 'npm run build'
                
            }
        }
    }
}