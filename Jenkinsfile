pipeline {
    agent any

    environment {
        SONARQUBE_ENV = 'sonarqube-server'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/AbdallahMostafa02/DevSecOps-NodeJS-Bookstore-CICD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Test MongoDB') {
            steps {
                sh '''
                docker rm -f mongo-test || true
                docker run -d --name mongo-test -p 27017:27017 mongo:latest
                '''
            }
        }

        stage('Run Tests') {
            steps {
                sh 'MONGO_URL=mongodb://localhost:27017/bookstore npm test'
            }
        }

        stage('Stop Test MongoDB') {
            steps {
                sh 'docker stop mongo-test || true'
                sh 'docker rm mongo-test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t bookstore-app:${BUILD_NUMBER} ."
            }
        }

        stage('SonarQube') {
            steps {
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=bookstore-app \
                          -Dsonar.sources=. \
                          -Dsonar.login=$SONAR_AUTH_TOKEN
                    '''
                }
            }
        }
        
        stage('OWASP') {
            steps {
                dependencyCheck odcInstallation: 'DP-Check', additionalArguments: '--scan ./ --format XML --format HTML --out ./dependency-check-report'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }      
    }


    
    post {
        always {
            archiveArtifacts artifacts: '**/dependency-check-report.xml', fingerprint: true
        }

        success {
            echo "Pipeline Completed Successfully!"
            slackSend(
                channel: '#devsecops_task_tracking',
                color: 'good',
                message: "Pipeline Completed Successfully!"
            )
        }

        failure {
            echo "Pipeline Failed!"
            slackSend(
                channel: '#devsecops_task_tracking',
                color: 'danger',
                message: "Pipeline Failed!"
            )
        }
    }
}
