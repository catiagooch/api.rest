pipeline {
    agent any

    stages {
        stage('Clonar o repositorio') {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar testes') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
}
