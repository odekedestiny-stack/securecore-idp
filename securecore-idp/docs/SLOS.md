# Service Level Objectives (SLOs) - SecureCore IDP
## 1. Availability SLO
* **Objective:** 99.9% uptime over a rolling 30-day window.
* **Measurement:** Measured via CloudWatch Synthetics Canaries pinging the health endpoint every 5 minutes.
* **Error Budget:** 43 minutes and 48 seconds of downtime per month.
## 2. Latency SLO
* **Objective:** 95% of API requests served in under 500ms.
* **Measurement:** Measured via Application Load Balancer (ALB) target response time metrics.
