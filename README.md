# 🛠️ End-to-End DevSecOps CI/CD Pipeline for Node.js App using Jenkins

> Complete DevSecOps CI/CD Pipeline using Jenkins, Docker, SonarQube, OWASP, Docker Hub, Prometheus, Grafana, and Slack.
---

## 📑 Table of Contents

1. [Overview](#overview)  
2. [Prerequisites](#prerequisites)  
3. [Jenkins Setup](#jenkins-setup)  
4. [SonarQube Setup](#sonarqube-setup)  
5. [Running the Pipeline](#running-the-pipeline)  
6. [Pipeline Stages](#pipeline-stages)  
7. [Access Services](#access-services)  
8. [Pipeline Flow Diagram](#pipeline-flow-diagram)  
9. [Repository](#repository)  
10. [Contact](#contact)

---

## Overview

This project demonstrates a **complete DevSecOps CI/CD pipeline** for a **Node.js Bookstore Application**, integrating **automation**, **security**, and **monitoring** to ensure reliable and secure software delivery.

---

## ⚙️ Prerequisites

Before running the pipeline, make sure the following are installed and configured properly on your machine:

- **Java**  
- **Jenkins**  
- **Docker** and **Docker Compose**  
- Add the Jenkins user to the Docker group:  
  ```bash
  sudo usermod -aG docker jenkins
  sudo systemctl restart jenkins

## 🧠 SonarQube Setup

1. Run SonarQube container:
   ```bash
   docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
   ```
2. Open your browser and go to:
   ```bash
   http://localhost:9000
   ```
3. Default credentials:
   ```bash
   Username: admin
   Password: admin
   ```
4. After logging in, it will ask you to change the password (set a new one).
5. Generate token: Administration → Security → Users → Generate Tokens
6. Add the SonarQube token as a Secret Text credential in Jenkins.
7. Go to Manage Jenkins → System → SonarQube servers
- Add the SonarQube name, URL: ```bash(http://localhost:9000)```, and select the token credential.

## 🔧 Jenkins Setup

1. Open Jenkins in your browser: 
  ```bash
  http://localhost:8080
  ```

2. Log in using your admin credentials.

3. Add credentials:

- GitHub (username+password or username+personal access token)

- Docker Hub (username+password or username+token)

- Slack Webhook

- SonarQube token

4. Install plugins:

- Docker, Docker Pipeline, CloudBees Docker Build and Publish

- SonarQube Scanner, OWASP Dependency-Check

- Slack Notification, Prometheus metrics

- Eclipse Temurin installer Plugin

5. Configure Tools in Jenkins:

- SonarQube Scanner

- Docker installation

- JDK (Java)

- OWASP Dependency-Check

6. Go to Manage Jenkins → System and add:

- SonarQube server

- Slack integration

## 🚀 Running the Pipeline

1. Create a new Pipeline project in Jenkins.

2. Choose the Pipeline script from SCM.

3. Select Git and paste the repository URL:
```bash
https://github.com/AbdallahMostafa02/DevSecOps-NodeJS-Bookstore-CICD.git
```
4. Save and click Build Now.

🧠 Pipeline Stages

- Check out the source code

- Run automated tests

- Analyze code quality with SonarQube

- Perform dependency scanning using OWASP Dependency Check

- Build a Docker image for the Node.js app

- Push the Docker image to Docker Hub (new stage)

- Deploy the container

- Expose metrics for Prometheus and Grafana

- Send Slack notifications

## 🌐 Access Services
```bash
| Service                       | URL                     | Default Credentials |
| ----------------------------- | ----------------------- | ------------------- |
| Node.js Bookstore Application | `http://localhost:3000` | -                   |
| SonarQube Dashboard           | `http://localhost:9000` | `admin` / `admin`   |
| Prometheus                    | `http://localhost:9090` | -                   |
| Grafana                       | `http://localhost:3001` | `admin` / `admin`   |
