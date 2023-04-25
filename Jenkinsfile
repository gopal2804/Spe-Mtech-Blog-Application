pipeline {
    agent any
    stages {
        stage("Git clone Stage") {
            steps {
                // git clone stage
                git url: 'https://github.com/gopal2804/Spe-Mtech-Blog-Application.git', branch: 'master'
            }
        }
        stage("Frontend prerequisite installations stage") {
            steps {
                //front end installing the dependencies
                dir('client'){
                    sh 'npm install'
                }
            }
        }
        stage("Backend prerequisite installations stage") {
            steps {
                dir('server'){
                    sh 'npm install'
                }
            }
        }
        stage('Building the images stage'){
            steps {
                dir('client'){
                    //building the docker image for frontend
                    sh 'docker build -t gopal2804/blog_app_frontend:latest .'
                }
                dir('server'){
                    //building the docker image for backend
                    sh 'docker build -t gopal2804/blog_app_backend:latest .'
                }
            }
        }
        stage('Pushing the images to DockerHub stage'){
            steps {
                script {
                    withDockerRegistry([ credentialsId: "docker", url: "" ]) {
                        // publishing the image created above for frontend
                        sh 'docker push gopal2804/blog_app_frontend:latest'
                    }

                    withDockerRegistry([ credentialsId: "docker", url: "" ]) {
                        // publishing the image created above for backend
                        sh 'docker push gopal2804/blog_app_backend:latest'
                    }
                }
            }
        }
        stage('Ansible Deploy Stage') {
				steps {
					ansiblePlaybook becomeUser: 'null',
					colorized: true,
					installation: 'Ansible',
					inventory: 'inventory',
					playbook: 'playbook.yml',
					sudoUser: 'null',
					vaultCredentialsId: 'Ansible'
				}
			}
    }
}