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

- Docker, Docker Pipeline, CloudBees Docker Build & Publish

- SonarQube Scanner, OWASP Dependency-Check

- Slack Notification, Prometheus metrics

5. Configure Tools in Jenkins:

- SonarQube Scanner

- Docker installation

- JDK (Java)

- OWASP Dependency-Check
```bash
| Plugin                                    | Purpose                       |
| ----------------------------------------- | ----------------------------- |
| Docker plugin                             | Docker integration            |
| Docker Pipeline                           | Docker steps in Jenkinsfile   |
| docker-build-step                         | Build and run containers      |
| CloudBees Docker Build and Publish plugin | Build & push Docker images    |
| SonarQube Scanner for Jenkins             | Code quality analysis         |
| OWASP Dependency-Check Plugin             | Dependency vulnerability scan |
| Slack Notification Plugin                 | Send build notifications      |
| Prometheus metrics                        | Export Jenkins metrics        |
```
