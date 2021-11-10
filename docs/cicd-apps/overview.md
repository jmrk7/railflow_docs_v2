---
sidebar_position: 1
---

# Overview

### What is CICD?
:::info
CICD stands for continuous integration and continuous delivery/continuous deployment. CI is a practice that embodies encapsulating and automating the software building and testing process using a variety of tools and frameworks. Once CI is complete, the code is then delivered to some environment as part of the CD process. 
:::

### Why use Railflow within the CI process?
:::info
All CI processes involve unit testing and functional/integration testing using a variety of testing frameworks and tools. These testing stages within the CI pipeline produce valuable test results that indicate the health of your application. In addition, the test name and directory structures provide a very good overview of areas of test coverage. CI systems are not a test case management system and as such, this valuable test information is not easily accessible or aggregatable to get a broader understanding of test activity and glean valuable metrics and reports.
:::

By adding Railflow within your CI pipeline, you can easily export all testing reports to TestRail. Once tests results are in TestRail, you can use TestRail's powerful dashboards and reports to better understand test activity across the organization.


### What CICD applications does Railflow support?
:::info
This is the golden age of CICD. There are tons of great old and new solutions. Railflow has been developed from the group up to work with all the CICD providers using both the plugin approach for Jenkins and TeamCity and NPM/Docker approach for SAAS CICD systems like Github, Gitlab, Travis, CircleCI, etc. Railflow docs have examples for all the major CICD systems. If you don't see your favorite CICD system, let us know and we would be happy to add additional examples.
:::
