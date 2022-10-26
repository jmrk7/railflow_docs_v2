---
sidebar_position: 7
---

# Cucumber

## Overview

:::info
[Cucumber BDD framework](https://cucumber.io/) is a popular functional testing framework which is used by many software development and QA teams.
[Railflow](https://railflow.io) helps users integrate cucumber tests with TestRail by either TeamCity/Jenkins CI plugins or the Railflow NPM CLI for use with many of the Saas CI systems like Github, Gitlab, Travis, Circle CI.
:::

## How does Railflow integrate Cucumber framework?
:::info
Cucumber like all other test framework and tools, produces structured result file. Railflow CI Plugins and CLI can process this results file and automatically parse and upload them into TestRail. Railflow is able to extract all the granular information and map them to tests and steps in TestRail giving user a very similar BDD like breakdown in TestRail.
:::

## Requirements
:::info
These requirements are specific to this sample project on this doc. Refer to https://cucumber.io/docs/installation/ for detailed on Cucumber requirements 
:::

:::info
The example below uses chrome driver. The installation/configuration of chrome driver is beyond the scope of ths tutorial.
:::

- Maven 3
- JDK 8
- NodeJS v14.17.0 or higher.
- NPM



## Cucumber Example 
In this example we will use Selenium WebDriver together with JUnit test framework.

### Create Maven project

```jsx title="maven create"
mvn -B archetype:generate -DgroupId=io.railflow.demo -DartifactId=cucumber-demo -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4
```

### Add dependencies 
Add required dependencies into `pom.xml` file

```jsx title="maven pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.railflow.demo</groupId>
    <artifactId>cucumber-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <cucumber.version>7.0.0</cucumber.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-java</artifactId>
            <version>${cucumber.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.cucumber</groupId>
            <artifactId>cucumber-junit</artifactId>
            <version>${cucumber.version}</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>3.141.59</version>
        </dependency>
    </dependencies>
</project>
```


### Add Feature File
Add an empty `pizza_tests.feature` file into `src/test/resources/io/railflow/demo/cucumber` directory:

![IDE](/img/bdd/cucumber/ide-1.png)

The `pizza_tests.feature` file contains two simple testing scenarios:

```jsx title="cucumber"
Feature: Pizza tests
  Some tests for pizza search

  Background:
    Given user navigates to http://google.com

  Scenario: There are results for pizza
    When the user enters "pizza" and hits Enter
    Then number of results more than zero

  Scenario: There are no bad pizzas
    When the user enters "bad pizza" and hits Enter
    Then no results are shown
```
### Map scenario into existing TestRail test case by ID

Railflow allows users to map Cucumber scenario's test result into existing test case in TestRail.  
 
This can be done by tagging the corresponding Cucumber scenario with `@testrail.id` tag.  

`@testrail.id` tag has the following syntax: `@testrail.id=<TestCase ID>`  
, where `TestCase ID` is the ID of the test case in TestRail, e.g.: `@testrail.id=C1234` or `@testrail.id=1234`

```jsx title="Mapping cucumber scenario into TestRail test case"
Feature: Pizza tests
  Some tests for pizza search

  Background:
    Given user navigates to http://google.com

  @testrail.id=C1234
  Scenario: There are results for pizza
    When the user enters "pizza" and hits Enter
    Then number of results more than zero

  Scenario: There are no bad pizzas
    When the user enters "bad pizza" and hits Enter
    Then no results are shown
```

### Implement Scenario
To implement a scenario, create a new `io.railflow.demo.cucumber.PizzaTests` class which contain methods for steps:

```jsx title="cucumber example"
package io.railflow.demo.cucumber;

import java.util.List;

import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.cucumber.java.After;
import io.cucumber.java.AfterStep;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class PizzaTests {
	private static final String GOOGLE_URL = "http://google.com";
	private WebDriver driver;
	private List<WebElement> results;

	@Before
	public void before() {
		System.setProperty("webdriver.chrome.driver", "chromedriver.exe");
		final ChromeOptions options = new ChromeOptions();
		options.addArguments("--start-fullscreen");
		this.driver = new ChromeDriver(options);
	}
	
	@Given("^user navigates to http://google\\.com$")
	public void user_navigates_to_google() {
		this.driver.navigate().to(GOOGLE_URL);
	}

	@When("^the user enters \"([^\"]*)\" and hits Enter$")
	public void user_enters_query(final String query) {
		this.results = getGoogleResults(query);
	}

	@Then("^number of results more than zero$")
	public void number_of_results_more_than_zero() {
		Assert.assertTrue("There are no results for pizza", this.results.size() > 0);
	}

	@Then("^no results are shown$")
	public void no_results_are_shown() {
		if (this.results.size() > 0) {
			throw new RuntimeException("Liar, there are no bad pizzas!");
		}
	}

	private List<WebElement> getGoogleResults(final String query) {
		final WebElement element = this.driver.findElement(By.name("q"));
		element.sendKeys(query);
		element.submit();
		new WebDriverWait(this.driver, 1)
				.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("search")));
		return this.driver.findElements(By.xpath("//*[@id='rso']//*[@class='g']//a"));
	}

	@After
	public void afterScenario() {
		if (this.driver != null) {
			this.driver.close();
			this.driver.quit();
		}
	}
	
	@AfterStep
	public void afterStep(final Scenario scenario)
	{
		if (scenario.isFailed()) {
			scenario.attach(((TakesScreenshot) this.driver).getScreenshotAs(OutputType.BYTES), "image/png","failure.png");
		}
	}
}
```

Except methods for steps, `PizzaTests` class contains the following additional methods:
1. `beforeScenario()` - the method is marked with `io.cucumber.java.Before` annotation, so Cucumber executes this method before each scenario, so we can put code for creating Selenium WebDriver object here
2. `afterScenario()` - the method is marked with `io.cucumber.java.After` annotation, so Cucumber executes this method after each scenario, so this is a good place to do clean up and close WebDriver instance.
3. `afterStep(Scenario scenario)` - the method is executed after each completed step and can be used for capturing screenshots if step has failed.

### Setup Cucumber Test Runner
In order to run JUnit tests together with Cucumber we need to configure Cucumber Test Runner. To do this, just add `io.railflow.demo.cucumber.TestRunner` class:

```jsx title="cucumber example"
package io.railflow.demo.cucumber;

import org.junit.runner.RunWith;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;


@RunWith(Cucumber.class)
@CucumberOptions(plugin = { "json:target/test-report.json" })
public class TestRunner {

}
```

`TestRunner` class defines the Cucumber runner and also instructs Cucumber to generate a JSON report in `target` folder of the project.

### Executing test
To execute tests and generate test report, just run the command below. This will generate a new `target/test-report.json` file which can be then uploaded into TestRail using Railflow CI plugins or the Railflow CLI. 

```jsx title="maven test"
mvn clean test
```


## Process Cucumber Results
Depending on how Cucumber tests were executed, you can use the appropriate Railflow utility (Jenkins or TeamCity plugin or Railflow NPM CLI) to process Cucumber results.

- [Railflow CICD Overview](https://docs.railflow.io/docs/cicd-apps/overview)
- [Railflow CLI](https://docs.railflow.io/docs/railflow-cli/overview)

![railflow cli](/img/bdd/cucumber/npm-exec-1.png)
![railflow cli](/img/bdd/cucumber/npm-exec-2.png)

![railflow cli](/img/bdd/cucumber/results-1.png)

![railflow cli](/img/bdd/cucumber/results-2.png)


## Resources

The example project can be found in GitHub: 

https://github.com/railflow/cucumber_example


