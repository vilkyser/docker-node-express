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
                sh 'apt-get git'
                sh 'apt-get install nodejs'          
                sh 'apt-get install npm'
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