# End-to-End DevSecOps CI/CD Pipeline for Node.js App using Jenkins

> Complete DevSecOps CI/CD Pipeline using Jenkins, Docker, SonarQube, OWASP, Docker Hub, Prometheus, Grafana, and Slack.
---

## 📑 Table of Contents

1. [Overview](#overview)  
2. [Prerequisites](#prerequisites)
3. [SonarQube Setup](#sonarqube-setup)  
4. [Jenkins Setup](#jenkins-setup)    
5. [Running the Pipeline](#running-the-pipeline)  
6. [Pipeline Stages](#pipeline-stages)  
7. [Access Services](#access-services)  
8. [Pipeline Flow Diagram](#pipeline-flow-diagram)  
9. [Contact](#contact)

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

---

## 🧠 SonarQube Setup

1. Run SonarQube container:

  ```bash
  docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
  ```
   
3. Open your browser and go to:

  ```bash
  http://localhost:9000
  ```
   
4. Default credentials:

  ```bash
  Username: admin
  Password: admin
  ```
   
5. After logging in, it will ask you to change the password (set a new one).
  
6. Generate token: Administration → Security → Users → Generate Tokens.
   
7. Add the SonarQube token as a Secret Text credential in Jenkins.
   
8. Go to Manage Jenkins → System → SonarQube servers:
- Add the SonarQube name, URL: ```bash(http://localhost:9000)```, and select the token credential.

---

## 🔧 Jenkins Setup

1. Open Jenkins in your browser and log in:

  ```bash
  http://localhost:8080
  ```

2. Add credentials:

- GitHub (username+password or username+personal access token)
- Docker Hub (username+password or username+token)
- Slack Webhook credentials as a secret text
- SonarQube token as a secret text

4. Install plugins:

- Docker, Docker Pipeline, CloudBees Docker Build and Publish
- SonarQube Scanner, OWASP Dependency-Check
- Slack Notification, Prometheus metrics
- Eclipse Temurin installer Plugin (for Java)

5. Configure Tools in Jenkins:

- SonarQube Scanner
- Docker installation
- JDK (Java)
- OWASP Dependency-Check

6. Go to Manage Jenkins → System and add:

- SonarQube server
- Slack integration

---

## 🚀 Running the Pipeline

1. Create a new Pipeline project in Jenkins.

2. Choose the Pipeline script from SCM.

3. Select Git and paste the repository URL:

  ```bash
  https://github.com/AbdallahMostafa02/DevSecOps-NodeJS-Bookstore-CICD.git
  ```

4. Save and click Build Now.

---

## 🧠 Pipeline Stages

- Check out the source code

- Run automated tests

- Analyze code quality with SonarQube

- Perform dependency scanning using OWASP Dependency Check

- Build a Docker image for the Node.js app

- Push the Docker image to Docker Hub

- Deploy the container

- Expose metrics for Prometheus and Grafana

- Send Slack notifications

---

## 🌐 Access Services

Once the pipeline completes successfully, you can access all services from your browser:

🧩 Node.js Bookstore Application

  ```bash
  http://localhost:3000
  ```

🔒 SonarQube Dashboard

  ```bash
  http://localhost:9000
  ```

Default credentials:

  ```bash
  Username: admin
  Password: admin
  ```

📊 Prometheus

  ```bash
  http://localhost:9090
  ```

📈 Grafana

  ```bash
  http://localhost:3001
  ```

Default credentials:

  ```bash
  Username: admin
  Password: admin
  ```

---

## 🔄 Pipeline Flow Diagram

  ```bash
   GitHub
     |
     v
   Jenkins Pipeline
   ├─> Checkout
   ├─> Test
   ├─> SonarQube Analysis
   ├─> OWASP Dependency Scan
   ├─> Build Docker Image
   ├─> Push to Docker Hub
   ├─> Deploy Container
   └─> Monitoring & Slack Notifications
          | 
          v
    Prometheus & Grafana
  ```

---

## 📬 Contact

**Abdallah Mostafa**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdallah-mostafa-04b2421a6/)  
[![Email](https://img.shields.io/badge/Email-abdallahmostafa6884@gmail.com-red?style=flat&logo=gmail&logoColor=white)](mailto:abdallahmostafa6884@gmail.com)
