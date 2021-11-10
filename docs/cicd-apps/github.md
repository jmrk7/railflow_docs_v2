---
sidebar_position: 2
---

# Github

## GitHub and Testing Results
:::info
GitHub is one of the most popular SAAS CI applications and is used by thousands of companies all over the world. GitHub is used to define the application build and test processes. QA teams also use GitHub to run/schedule functional tests across a variety of tools and frameworks. However, the results of these tests can only be viewed in GitHub, and it is not really possible to aggregate results across multiple jobs, retain long history, and delegate test failures to your team.  
:::

## TestRail + GitHub + Railflow CLI 
:::info
By using the Railflow CLI, you can easily integrate GitHub testing jobs with TestRail and automatically export all testing reports to TestRail. Aggregating result from all your GitHub jobs into TestRail allows teams to look at test trends, auto-assign failures via Railflow automation, create link between GitHub and TestRail, and much more. 
:::


## Docker to the Rescue
:::tip
[Railflow CLI Docker Image](https://hub.docker.com/r/railflow/railflow) can be easily incorporated within your GitHub pipelines to quickly and easily integrate GitHub with TestRail.
:::

In this example below, we are building and publishing the test results from a TestNG project. The GitHub pipeline uses the [Railflow Docker Image](https://hub.docker.com/r/railflow/railflow) which is available on DockerHub.


```jsx title="Github Pipeline Example"
name: Maven Test

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:


jobs:
  mvn-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - name: Run mvn clean test
        run: mvn clean test
        continue-on-error: true
      - uses: actions/upload-artifact@v2
        with:
          name: maven_build
          path: ./target/surefire-reports/testng-results.xml
        if: ${{ always() }}

  railflow-test:
    runs-on: ubuntu-latest
    container: railflow/railflow:latest
    needs: [mvn-test]
    defaults:
      run:
        working-directory: /usr/railflow
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/download-artifact@v2
        with:
          name: maven_build
          path: /usr/railflow
      - name: List build download dir
        run: ls /usr/railflow

      # Runs a single command using the runners shell
      - name: Run railflow testing
        env:
          RAILFLOW_KEY: ${{ secrets.RAILFLOW_KEY }}
          RAILFLOW_USERNAME: ${{ secrets.RAILFLOW_USERNAME }}
          RAILFLOW_PASSWORD: ${{ secrets.RAILFLOW_PASSWORD }}
          TESTRAIL_URL: ${{ secrets.TESTRAIL_URL }}
        run: npx railflow -k $RAILFLOW_KEY -url $TESTRAIL_URL -u $RAILFLOW_USERNAME -p $RAILFLOW_PASSWORD -pr "GitHub-Demo" -path Demo/TestNG -f testng -a john@foo.com, jane@foo.com -r /usr/railflow/testng-results.xml -tp TestPlanName 

```

## TestRail Export Details
>Railflow creates a very rich and flexible integration between GitHub and TestRail. Based on Railflow configuration, TestRail entities can be created or updated automatically as part of your CICD process. The screenshots below shows the output of processing a typical JUnit test framework report. 

### GitHub Job Output
![github build logs](/img/cicd/github/github-output.png)

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
:::info
Smart Failure assignment is a very powerful feature of Railflow and allows teams to efficiently and strategically assign test failures to specified team members. Doing this automatically as part of the CI process means that teams don't waste valuable time during the test triage process. 
:::

:::note
To use Smart Failure Assignment feature, the users need to have `Global Role` under `Project Access`.
::: 

![smart assign](/img/cicd/jenkins/smart-failure-5.png)

### Example
Consider a GitHub Selenium Webdriver project build is failing with 5 test failures, and 2 user configured in the Railflow CLI

![smart assign](/img/cicd/github/github-smart-assign.png)

### GitHub Build Logs
![smart failure](/img/cicd/jenkins/smart-failure-2.png)

### TestRail Results View
In this example above, Railflow's Smart Assignment feature filtered all the test failures and distributed them equally across the specified users. This nifty feature greatly eliminates the manual test triage process and saves teams valuable time.

![smart failure](/img/cicd/jenkins/smart-failure-3.png)
![smart failure](/img/cicd/jenkins/smart-failure-4.png)

