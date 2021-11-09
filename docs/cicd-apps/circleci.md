---
sidebar_position: 2
---

# Circle CI

## Circle CI and Testing Results
>Circle CI is one of the most popular SAAS CI applications and is used by thousands of companies all over the world. Circle CI is used to define the application build and test processes. QA teams also use GitHub to run/schedule functional tests across a variety of tools and frameworks. However, the results of these tests can only be viewed in Circle CI, and it is not really possible to aggregate results across multiple jobs, retain long history, and delegate test failures to your team.  

## TestRail + Circle CI + Railflow 
>By using Railflow, you can easily integrate Circle CI testing jobs with TestRail and automatically export all testing reports to TestRail. Aggregating result from all your Circle CI jobs into TestRail allows teams to look at test trends, auto-assign failures via Railflow automation, create link between GitHub and TestRail, and much more. 


## Docker to the Rescue
>Railflow's Docker image can be easily incorporated within your Circle CI pipelines to quickly and easily integrate Circle CI with TestRail.

In this example below, we are building and publishing the test results from a TestNG project. The GitHub pipeline uses the Railflow Docker image which is available on DockerHub.


```jsx title="Circle CI Pipeline Example"
version: 2
jobs:
  build:
    docker:
      - image: circleci/openjdk:8-jdk

    working_directory: ~/repo

    environment:
      # Customize the JVM maximum heap limit
      JVM_OPTS: -Xmx3200m
      TERM: dumb

    steps:
      - checkout
      # run tests!
      - run: mvn clean test || true
      - run: ls .
      - store_artifacts:
          path: ./target/surefire-reports/testng-results.xml

  railflow_test:
    docker:
      - image: railflow/railflow:latest

    working_directory: /usr/railflow
    steps:
      - run:
          name: download artifacts
          command: |
            curl -H "Circle-Token: $CIRCLE_TOKEN" https://circleci.com/api/v1.1/project/github/railflow/testng_example/10/artifacts \
            | grep -o 'https://[^"]*' \
            | wget --verbose --header "Circle-Token: $CIRCLE_TOKEN" --input-file -
      - run:
          name: Run railflow testing
          command: npx railflow -k $RAILFLOW_KEY -url $TESTRAIL_URL -u $RAILFLOW_USERNAME -p $RAILFLOW_PASSWORD -pr "Github-Demo" -path Demo/TestNG -f testng -a john@foo.com, jane@foo.com -r /usr/railflow/testng-results.xml -tp TestPlanName

workflows:
  version: 2
  build_and_test:
    jobs:
      - build
      - railflow_test:
          requires:
            - build

```

## TestRail Export Details
>Railflow creates a very rich and flexible integration between Circle CI and TestRail. Based on Railflow configuration, TestRail entities can be created or updated automatically as part of your CICD process. The screenshots below shows the output of processing a typical JUnit test framework report. 

### Circle CI Job Output 
![circleci job output ](/img/cicd/circleci/circle-build-output.png)

### Automatic Test Creation
![automatic test creation ](/img/cicd/jenkins/plugin-exec-3.png)

### Automatic Test Plan and Runs
![automatic testplan ](/img/cicd/jenkins/plugin-exec-4.png)
![automatic testrun ](/img/cicd/jenkins/plugin-exec-5.png)

### Test Results Details
![test results ](/img/cicd/jenkins/plugin-exec-6.png)

### Automatic Milestones
![automatic milestones ](/img/cicd/jenkins/plugin-exec-7.png)


## Smart Failure Assignment
>Smart Failure assignment is a very powerful feature of Railflow and allows teams to efficiently and strategically assign test failures to specified team members. Doing this automatically as part of the CI process means that teams don't waste valuable time during the test triage process. 

>To use Smart Failure Assignment feature, the users need to have `Global Role` under `Project Access`. 
![smart failure](/img/cicd/jenkins/smart-failure-5.png)

### Example
Consider a Circle CI Selenium Webdriver project build is failing with 5 test failures, and 2 user configured in the Railflow CLI

![circleci build logs](/img/cicd/circleci/circle-smart-assign.png)

### Circle CI Build Logs 

![circleci build logs](/img/cicd/jenkins/smart-failure-2.png)

### TestRail Results View
In this example above, Railflow's Smart Assignment feature filtered all the test failures and distributed them equally across the specified users. This nifty feature greatly eliminates the manual test triage process and saves teams valuable time.

![smart failure](/img/cicd/jenkins/smart-failure-3.png)
![smart failure](/img/cicd/jenkins/smart-failure-4.png)


