pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
        HOME = '.'
        npm_config_cache = 'npm-cache'
    }
    stages {
        stage('Install Packages') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test and Build') {
            parallel {
                stage('Run Tests') {                
                    steps {
                        sh "chmod +x -R '${env.WORKSPACE}'"
                        sh './jenkins/scripts/test.sh'
                    }
                }
                stage('Create Build Artifacts') {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('UserTesting') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
        stage('Deploy') {
            steps {
                sh "sudo rm -rf /var/www/jenkins-react-app"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/jenkins-react-app/"
            }
        }
        stage('Production') {
            steps {
                withAWS(region:'us-east-2',credentials:'AWSJenkins') {
                    s3Delete(bucket: 'arn:aws:s3:::winejs', path:'**/*')
                    s3Upload(bucket: 'arn:aws:s3:::winejs', workingDir:'build', includePathPattern:'**/*');
                }
            }
        }
    }
}
