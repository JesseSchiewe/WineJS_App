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
                input message: 'Open a browser to localhost:3000. When you are finished testing the web site, click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
        stage('Deploy') {
            steps {
                // sh "rm -rf '/var/www/WineJS'"
                // sh "cp -r '${WORKSPACE}/build/' '/var/www/WineJS/'"
                sh "echo 'skipping localhost deployment'"
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
