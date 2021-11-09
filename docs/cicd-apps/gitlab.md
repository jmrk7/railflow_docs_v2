---
sidebar_position: 2
---

# Gitlab

## GitLab and Testing Results
>GitLab is one of    the most popular SAAS CI applications and is used by thousands of companies all over the world. GitLab is used to define the application build and test processes. QA teams also use GitLab to run/schedule functional tests across a variety of tools and frameworks. However, the results of these tests can only be viewed in GitLab, and it is not really possible to aggregate results across multiple jobs, retain long history, and delegate test failures to your team.  

## TestRail + Gitlab + Railflow 
>By using Railflow, you can easily integrate GitLab testing jobs with TestRail and automatically export all testing reports to TestRail. Aggregating result from all your GitLab jobs into TestRail allows teams to look at test trends, auto-assign failures via Railflow automation, create link between TeamCity and TestRail, and much more. 


## Docker to the Rescue
>Railflow's Docker image can be easily incorporated within your Gitlab pipelines to quickly and easily integrate Gitlab with TestRail.

In this example below, we are building and publishing the test results from a TestNG project. The Gitlab pipeline uses the Railflow Docker image which is available on DockerHub.


```jsx title="Gitlab Pipeline Example"
maven-build:
  stage: build
  image:
    name: maven
  variables:
    GIT_DEPTH: 10
  script:
    - mvn clean test || true
  artifacts:
    untracked: true
    paths:
      - ./target/surefire-reports/testng-results.xml
  only:
    - master

railflow-test:
  image:
    name: railflow/railflow:latest
    entrypoint: ["/usr/bin/env"]
  stage: test
  variables:
    RAILFLOW_KEY: $RAILFLOW_KEY
    RAILFLOW_USERNAME: $RAILFLOW_USERNAME
    RAILFLOW_PASSWORD: $RAILFLOW_PASSWORD
    TESTRAIL_URL: $TESTRAIL_URL
  dependencies:
    - maven-build
  script:
    - cp ./target/surefire-reports/testng-results.xml /usr/railflow
    - cd /usr/railflow
    - npx railflow -k $RAILFLOW_KEY -url $TESTRAIL_URL -u $RAILFLOW_USERNAME -p $RAILFLOW_PASSWORD -pr "Github-Demo" -path Demo/TestNG -f testng -r ./testng-results.xml -tp TestPlanName -a john@foo.com, jane@foo.com
  only:
    - master
```

## TestRail Export Details
>Railflow creates a very rich and flexible integration between Gitlab and TestRail. Based on Railflow configuration, TestRail entities can be created or updated automatically as part of your CICD process. The screenshots below shows the output of processing a typical JUnit test framework report. 

### Gitlab Job Output
![Gitlab build logs](/img/cicd/gitlab/gitlab-job-output.png)

### Automatic Test Creation 
![automatic test creation](/img/cicd/jenkins/plugin-exec-3.png)

### Automatic Test Plan and Runs
![automatic test plan](/img/cicd/jenkins/plugin-exec-4.png)
![automatic test run](/img/cicd/jenkins/plugin-exec-5.png)

### Test Results Details
![test results](/img/cicd/jenkins/plugin-exec-6.png)

### Automatic Milestones
![automatic milestones](/img/cicd/jenkins/plugin-exec-7.png)

## Smart Failure Assignment
>Smart Failure assignment is a very powerful feature of Railflow and allows teams to efficiently and strategically assign test failures to specified team members. Doing this automatically as part of the CI process means that teams don't waste valuable time during the test triage process. 

>To use Smart Failure Assignment feature, the users need to have `Global Role` under `Project Access`. 
![smart assign](/img/cicd/jenkins/smart-failure-5.png)


### Example
Consider a Gitlab Selenium Webdriver project build is failing with 5 test failures, and 2 user configured in the Railflow CLI
![smart assign](/img/cicd/gitlab/gitlab-smart-assign.png)

### Gitlab Build Logs 
![smart failure](/img/cicd/jenkins/smart-failure-2.png)

### TestRail Results View
In this example above, Railflow's Smart Assignment feature filtered all the test failures and distributed them equally across the specified users. This nifty feature greatly eliminates the manual test triage process and saves teams valuable time.

![smart failure](/img/cicd/jenkins/smart-failure-3.png)
![smart failure](/img/cicd/jenkins/smart-failure-4.png)






