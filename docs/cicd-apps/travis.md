---
sidebar_position: 2
---

# Travis CI

## GitHub and Testing Results
>Travis CI is one of the most popular SAAS CI applications and is used by thousands of companies all over the world. Travis CI is used to define the application build and test processes. QA teams also use Travis CI to run/schedule functional tests across a variety of tools and frameworks. However, the results of these tests can only be viewed in GitHub and it is not really possible to aggregate results across multiple jobs, retain long history, and delegate test failures to your team.  

## TestRail + Travis CI + Railflow 
>By using Railflow, you can easily integrate Travis CI testing jobs with TestRail and automatically export all testing reports to TestRail. Aggregating result from all your Travis CI jobs into TestRail allows teams to look at test trends, auto-assign failures via Railflow automation, create link between Travis CI and TestRail, and much more. 


## Docker to the Rescue
>Railflow's Docker image can be easily incorporated within your Travis CI pipelines to quickly and easily integrate Travis CI with TestRail.

In this example below, we are building and publishing the test results from a TestNG project. The Travis CI pipeline uses the Railflow Docker image which is available on DockerHub.

```jsx title="Travis CI Pipeline Example"
language: java

git:
  depth: 3

services:
  - docker

install: true

before_install:
- docker pull railflow/railflow:latest
- docker run -d railflow/railflow:latest /bin/sh -c "cd /usr/railflow"

script:
- mvn clean test || true
- npx railflow -k $RAILFLOW_KEY -url $TESTRAIL_URL -u $RAILFLOW_USERNAME -p $RAILFLOW_PASSWORD -pr "Github-Demo" -path Demo/TestNG -f testng -r ./target/surefire-reports/testng-results.xml -a john@foo.com, jane@foo.com -tp TestPlanName 

```

## TestRail Export Details
>Railflow creates a very rich and flexible integration between Travis CI and TestRail. Based on Railflow configuration, TestRail entities can be created or updated automatically as part of your CICD process. The screenshots below shows the output of processing a typical JUnit test framework report. 

### Travis CI Build Output
![Travis CI](/img/cicd/travisci/travis-build-output.png)

### Automatic Test Creation
![Travis CI](/img/cicd/jenkins/plugin-exec-3.png)

### Automatic Test Plan and Runs
![Travis CI](/img/cicd/jenkins/plugin-exec-4.png)
![Travis CI](/img/cicd/jenkins/plugin-exec-5.png)


### Test Results Details
![Travis CI](/img/cicd/jenkins/plugin-exec-6.png)

### Automatic Milestones
![Travis CI](/img/cicd/jenkins/plugin-exec-7.png)


## Smart Failure Assignment
>Smart Failure assignment is a very powerful feature of Railflow and allows teams to efficiently and strategically assign test failures to specified team members. Doing this automatically as part of the CI process means that teams don't waste valuable time during the test triage process. 

>To use Smart Failure Assignment feature, the users need to have `Global Role` under `Project Access`. 
![Travis CI](/img/cicd/jenkins/plugin-exec-5.png)

### Example
Consider a Travis CI Selenium Webdriver project build is failing with 5 test failures, and 2 users configured in the Railflow CLI

![Travis CI](/img/cicd/travisci/travis-smart-assign.png)


### Travis CI Build Logs
![Travis CI](/img/cicd/jenkins/smart-failure-2.png)


### TestRail Results View
In this example above, Railflow's Smart Assignment feature filtered all the test failures and distributed them equally across the specified users. This nifty feature greatly eliminates the manual test triage process and saves teams valuable time.

![Travis CI](/img/cicd/jenkins/smart-failure-3.png)

![Travis CI](/img/cicd/jenkins/smart-failure-4.png)



