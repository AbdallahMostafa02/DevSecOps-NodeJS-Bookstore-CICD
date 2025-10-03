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

        stage('Build Docker Image') {
            steps {
                sh "docker build -t bookstore-app:${BUILD_NUMBER} ."
            }
        }

        // stage('Run Tests') {
        //     steps {
        //         sh "docker-compose run --rm bookstore-app:${BUILD_NUMBER} npm test"
        //     }
        // }

        // stage('Run Tests') {
        //     steps {
        // sh 'docker-compose run --rm app npm test'
        //     }
        // }

        stage('SonarQube') {
            tools {
                jdk 'JDK17'  // الاسم اللي اخترته في Global Tool Configuration
                }
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

        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
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
