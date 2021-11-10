---
sidebar_position: 1
---

# Railflow Introduction


### What is Railflow?
:::info

Railflow is a set of solutions that allows organizations to integrate various test frameworks and CI applications with [TestRail](https://www.gurock.com/testrail/). By integrating all testing activities with TestRail using Railflow, engineering teams can bring all testing metrics under a single platform - TestRail. 
:::
Railflow is an out-of-the-box set of solutions/tools that are a companion to your CICD and TestRail ecosystem. This means that you don't have to write and maintain customized scripts and tools for integrating with TestRail REST API. Railflow runs side by side with your existing tools and does not need any complicated setup. Railflow does all the heavy lifting so that you can focus on your day job.


### Why use Railflow?
:::info
Railflow helps unify all your testing activities/metrics inside TestRail. By having all test framework reports inside TestRail, teams can quickly identify issues, communicate effectively, and everyone can have a shared understanding of quality.
:::

One of the biggest challenges around software quality measurement is the communication overhead. How do you know when testing is complete and when to ship the product to your customers? Answering these questions requires a careful analysis of testing results so that teams can make an informed decision. In today's complex and globally distributed organizations, testing data is typically spread across multiple teams, CICD systems, and test frameworks. Railflow helps bring all of this critical data into your existing TestRail instance so that you can use TestRail's powerful reporting and dashboards to make informed decisions.

Railflow can help teams get the most out of their TestRail investment, reduce unnecessary status meetings, and improve overall team communication.

### Railflow Architecture
:::info
Railflow has been designed from the ground up and uses the [TestRail REST API](https://www.gurock.com/testrail/docs/api) for developing the various integrations between CICD systems and various testing frameworks. Railflow's flexible architecture allows teams to set up and configure Railflow and start seeing results in TestRail within 5 minutes.
:::

Railflow solution consists of the following parts that can be easily used across any CICD setup.
1. [Railflow CLI NPM package](https://www.npmjs.com/package/railflow): A simple yet powerful Command Line Interface (CLI) for exporting various types of test reports into TestRail. Railflow NPM can be used with any SAAS CICD applications like Github, Gitlab, CircleCI, Travis CI, etc
1. [Railflow CLI Docker image](https://hub.docker.com/r/railflow/railflow): Railflow Docker images contains the NPM CLI package
3. [Jenkins Plugin](../docs/cicd-apps/jenkins): Jenkins plugin capable of exporting various types of test reports into TestRail
4. [TeamCity Plugin](../docs/cicd-apps/teamcity): TeamCity plugin capable of exporting various types of test reports into TestRail

![railflow architecture](/img/arch/railflow-arch.png)

