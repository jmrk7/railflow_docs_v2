---
sidebar_position: 2
---

# Cucumber

# Introduction
[Cucumber BDD framework](https://cucumber.io/) is a popular framework which is used by many software development teams.
[Railflow](https://railflow.io) platform can help you to integrate cucumber tests with TestRail providing convenient NPM CLI tool and plugins for Jenkins and TeamCity.

# Writing cucumber tests
In this example we will use Selenium WebDriver together with JUnit test framework.

## Prerequisites
- Maven 3
- JDK 8
- Chromedriver
- [NodeJS](https://nodejs.org) - v14 or higher.
- [NPM](https://www.npmjs.com/) 

## Creating Maven project
Maven project can be created manually or by executing the following command:

```jsx title="maven create"
mvn -B archetype:generate -DgroupId=io.railflow.demo -DartifactId=cucumber-demo -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4
```


Once the project is created, some required dependencies should be added into `pom.xml` file:

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


## Adding cucumber feature files:
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

## Downloading WebDriver implementation
In order to run Selenium tests one of the WebDriver implementations should be added to your project. In this example we use [Chrome Driver](https://chromedriver.chromium.org/).
The easiest way to add it into the project is just download archive from https://chromedriver.chromium.org/ and unpack into the project root folder:

![IDE](/img/bdd/cucumber/ide-2.png)

## Implementing scenarios
To implement scenario, create a new `io.railflow.demo.cucumber.PizzaTests` class which contain methods for steps:

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

## Setting up Cucumber Test Runner
To be able to run JUnit tests together with Cucumber we need to configure Cucumber Test Runner. To do this, just add `io.railflow.demo.cucumber.TestRunner` class:

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

`TestRunner` class defines the Cucumber runner and also makes Cucumber to generate JSON report in `target` folder of the project.

## Executing test
To execute tests and generate test report, just run:

```jsx title="maven test"
mvn clean test
```

It will generate a new `target/test-report.json` file which can be then uploaded into TestRail using Railflow NPM package.

## Uploading Cucumber JSON report into TestRail
To upload generated in the previous step JSON report, the following steps should be done:

1.  Installing Railflow NPM package:

```jsx title="Railflow CLI"
npm install railflow
```

2.  Run Railflow NPM package:

```jsx title="Railflow CLI"
npx railflow -k <license key> -url <testrail address> -u <username> -p <password> -pr <project name> -path <suite name>/<section name>/<subsection name> -f cucumber -r target/test-report.json -tp <test plan name> -tr <test run name>
```

>**NOTE**
Adjust the Railflow arguments according to the Railflow [Command Line Reference](../railflow-cli/cli-reference)


### Results in TestRail
Here is the results in TestRail for the following command:

```jsx title="Railflow CLI"
npx railflow -k XXXXX-XXXXX-XXXXX-XXXXX -url https://someserver.io -u user@railflow.io -p pass -pr "Railflow Demo" -path Cucumber/Demo -f cucumber -r target/test-report.json -tp "Cucumber Plan" -tr "Cucumber Run"
```

![railflow cli](/img/bdd/cucumber/npm-exec-1.png)
![railflow cli](/img/bdd/cucumber/npm-exec-2.png)
![railflow cli](/img/bdd/cucumber/results-1.png)
![railflow cli](/img/bdd/cucumber/results-2.png)


## Resources

The example project can be found in GitHub: https://github.com/railflow/cucumber_example


