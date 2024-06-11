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
                

                // Using password only
                withCredentials([password(credentialsId: '5958894d-70c5-4bef-bcca-e720a52f6367', variable: 'PASSWORD')]) {
                    
                    sh '''
                        sudo apt-get update
                        echo "Password: $PASSWORD"
                        // Use the password here
                    '''

                    // sh 'sudo apt-get git'
                    // sh 'sudo apt-get install nodejs'          
                    // sh 'sudo apt-get install npm'
                    // sh 'npm test'
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