---
sidebar_position: 2
---

# Allure

## Overview

:::info
[Railflow](https://railflow.io) platform provides support for many popular test frameworks including [Allure](https://docs.qameta.io/allure/).
It allows users to integrate their Allure tests with TestRail easily and provides the following capabilities:

* Map Allure tests into one or several test cases in TestRail by providing test case IDs.
* Attach screenshots to the test case results in TestRail.
:::

## How do Allure and Railflow works together
Each time users run Allure tests with their favorite testing framework, Allure generates a bunch of JSON report files with different format (depending on the particular test framework).  
Those report files are needed to generate Allure HTML report and also unified JSON report files which can be then fed to Railflow for creating/updating required entities in TestRail.
To generate those reports Allure provides a special [`generate command`](https://docs.qameta.io/allure/#_generate_the_report). This command generates the `allure-report` folder with the following structure:

![Alt Report structure](/img/framework/allure/report_structure-1.png "Report structure")

JSON report files are located in `allure-report/data/test-cases` folder.

![Alt Report structure](/img/framework/allure/report_structure-2.png "Report structure")

These JSON report files need to be fed to Railflow in order to export results into TestRail.   

Railflow creates or updates the following entities in TestRail:  
* Sections and subsections
* Test cases
* Test plan and/or test run and test results
* Milestones and run configurations (optional)

Having written above, there are three required steps to integrate Allure reports with TestRail:
* Run the tests and create "intermediate" test reports
* Run `allure generate` command to generate HTML and "unified" JSON report files
* Run Railflow CLI or use CI Plugins and feed "unified" JSON report files to it.

## Allure with TestRail integration example
Allure supports variety of test frameworks like [Cucumber](https://cucumber.io/), [JUnit](https://junit.org/), [TestNG](https://testng.org/), [PyTest](https://docs.pytest.org/) and many more.  
For the example below we will be using JUnit 5 together with selenium and Apache Maven, but the configuration and steps are quite similar to any other test framework.

### Prerequisites
* Maven 3
* JUnit 5
* Allure Framework

### Create a maven project and modify pom.xml by adding JUnit 5, Allure, and Selenium libraries 

```xml title="pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.railflow.allure.examples</groupId>
    <artifactId>allure-junit5-selenium-maven</artifactId>
    <version>1.0</version>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>

        <java.version>1.8</java.version>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>

        <aspectj.version>1.9.1</aspectj.version>
        <allure.version>2.13.6</allure.version>
        <junit5.version>5.7.0</junit5.version>
        <selenium.version>3.141.59</selenium.version>
        <webdrivermanager.version>5.0.3</webdrivermanager.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>${junit5.version}</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>${junit5.version}</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-params</artifactId>
            <version>${junit5.version}</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-junit5</artifactId>
            <version>${allure.version}</version>
        </dependency>

        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>${selenium.version}</version>
        </dependency>

        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>${webdrivermanager.version}</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.30</version>
        </dependency>

    </dependencies>

    <build>
        <plugins>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.22.2</version>
                <configuration>
                    <testFailureIgnore>false</testFailureIgnore>
                    <argLine>
                        -Dfile.encoding=UTF-8
                        -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                    </argLine>
                    <systemPropertyVariables>
                        <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>

                        <junit.jupiter.extensions.autodetection.enabled>true</junit.jupiter.extensions.autodetection.enabled>
                        <junit.jupiter.execution.parallel.enabled>true</junit.jupiter.execution.parallel.enabled>
                        <junit.jupiter.execution.parallel.config.strategy>dynamic</junit.jupiter.execution.parallel.config.strategy>
                    </systemPropertyVariables>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.junit.platform</groupId>
                        <artifactId>junit-platform-surefire-provider</artifactId>
                        <version>1.3.2</version>
                    </dependency>
                    <dependency>
                        <groupId>org.aspectj</groupId>
                        <artifactId>aspectjweaver</artifactId>
                        <version>${aspectj.version}</version>
                    </dependency>
                </dependencies>
            </plugin>

            <plugin>
                <groupId>io.qameta.allure</groupId>
                <artifactId>allure-maven</artifactId>
                <version>2.11.2</version>
                <configuration>
                    <reportVersion>${allure.version}</reportVersion>
                    <resultsDirectory>${project.build.directory}/allure-results</resultsDirectory>
                </configuration>
                <executions>
                    <execution>
                        <phase>test</phase>
                        <goals>
                            <goal>report</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>

        </plugins>
    </build>

</project>

```

### Test Class : AllureDemoTest.java

```java title="AllureDemoTest.java"

package io.railflow.allure;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import io.github.bonigarcia.wdm.WebDriverManager;
import io.qameta.allure.*;
import io.railflow.allure.steps.LoginPage;

@Epic("WebDriver and Allure Railflow Demo")
@Owner("John Doe")
public class AllureDemoTest {
	@RegisterExtension
	WebdriverTestWatcher watcher = new WebdriverTestWatcher();
	private WebDriver driver;

	@BeforeAll
	public static void setupDriver() {
		WebDriverManager.firefoxdriver().setup();
	}

	@Step("Start web driver")
	@BeforeEach
	public void setup() {
		this.driver = new FirefoxDriver();
		this.watcher.setWebDriver(this.driver);
		this.driver.manage().window().maximize();
		this.driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		this.driver.get("https://test.railflow.io/");
	}

	@Severity(SeverityLevel.NORMAL)
	@Test
	@DisplayName("Verify Login Page Title")
	@Description("Verify the title of Login Page")
	@Feature("Login Page Tests")
	@Story("Title of Login Page")
	public void verify_login_page() {
		final LoginPage loginPage = new LoginPage(this.driver);
		loginPage.verifyPageTitle();
	}

	@Severity(SeverityLevel.BLOCKER)
	@Test
	@DisplayName("Unsuccessful Login to Application")
	@Description("Login Test with invalid credentials")
	@Feature("Login Page Tests")
	@Story("Unsuccessful Login to Application")
	public void invalid_credentials_error() {
		final LoginPage loginPage = new LoginPage(this.driver);
		loginPage.login("test@railflow.io", "password");
		loginPage.verifyErrorMessage();

	}

	@Severity(SeverityLevel.NORMAL)
	@Test
	@DisplayName("Verify Success Login")
	@Description("Verify that authorized user can log in to application")
	@Feature("Login Page Tests")
	@Story("Verify Success Login")
	public void verify_success_login() {
		final LoginPage loginPage = new LoginPage(this.driver);
		loginPage.setUserName("sergey@railflow.io");
		loginPage.setPassword("myS3crEt");
		loginPage.clickLogin();
		assertLoginName();
	}

	@Step("Verify Login Name Displayed Properly")
	private void assertLoginName() {
		assertEquals("Sergey", this.driver.findElement(By.id("myAccountButton")).getText());
	}

}

```
### LoginPage.java

```java title="LoginPage.java"

package io.railflow.allure.steps;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import io.qameta.allure.Step;

public class LoginPage {
	private final WebDriver driver;

	public LoginPage(final WebDriver driver) {
		this.driver = driver;
	}

	@Step("Set username")
	public void setUserName(final String strUserName) {
		this.driver.findElement(By.id("email")).sendKeys(strUserName);
	}

	@Step("Set password")
	public void setPassword(final String strPassword) {
		this.driver.findElement(By.id("password")).sendKeys(strPassword);
	}

	@Step("Click login button")
	public void clickLogin() {
		this.driver.findElement(By.id("loginButton")).click();
	}

	@Step("Verify title of Login Page")
	public void verifyPageTitle() {
		final String loginPageTitle = this.driver.findElement(By.xpath("/html/body/div[4]/form/h2")).getText();
		assertEquals("Account Login", loginPageTitle);
	}

	@Step("Verify error message when invalid credential is provided")
	public void verifyErrorMessage() {
		final String invalidCredentialErrorMessage = this.driver.findElement(By.xpath("/html/body/div[4]/form/div[1]/li")).getText();
		assertTrue(invalidCredentialErrorMessage.contains("These credentials do not match our records"));
	}

	@Step("Enter username and password")
	public void login(final String username, final String password) {

		// Fill username
		this.setUserName(username);

		// Fill password
		this.setPassword(password);

		// Click Login button
		this.clickLogin();
	}
}

```

### WebdriverTestWatcher.java

```java title="WebdriverTestWatcher.java"

package io.railflow.allure;

import java.io.ByteArrayInputStream;
import java.util.Optional;

import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import io.qameta.allure.Allure;
import io.qameta.allure.Step;

public class WebdriverTestWatcher implements TestWatcher {

	private WebDriver webDriver;

	@Override
	public void testFailed(final ExtensionContext context, final Throwable cause) {
		try {
			if (this.webDriver != null) {
				Allure.addAttachment("failure.png", new ByteArrayInputStream(((TakesScreenshot) this.webDriver).getScreenshotAs(OutputType.BYTES)));
			}
		} finally {
			disposeDriver();
		}
	}

	public void setWebDriver(final WebDriver webDriver) {
		this.webDriver = webDriver;
	}

	@Override
	public void testDisabled(final ExtensionContext context, final Optional<String> reason) {
		disposeDriver();
	}

	@Override
	public void testSuccessful(final ExtensionContext context) {
		disposeDriver();
	}

	@Override
	public void testAborted(final ExtensionContext context, final Throwable cause) {
		disposeDriver();
	}

	@Step("Close WebDriver")
	private void disposeDriver() {
		if (this.webDriver != null) {
			this.webDriver.quit();
			this.webDriver = null;
		}
	}

}

```


### Run tests and generate JUnit 5 report

```shell
mvn clean test
```
This command will generate different intermediate allure report files in `$project_directory/target/allure-results` directory.

### Generate Allure JSON reports
Run `allure generate` command to generate unified report from the intermediate report files located in the `$project_directory/target/allure-results` directory:
```shell
allure generate $project_directory/target/allure-results --clean -o $project_directory/target/allure-report
```

:::note
You can also run `mvn allure:report` to generate the report. In such a case report files will be located in `$project_directory/target/site` directory.
:::

This will generate HTML and unified allure JSON report files in `$project_directory/target/allure-report` directory:  

Note that JSON files are located in `$project_directory/target/allure-report/data/test-cases` directory. Those files should be provided to Railflow.

![Alt Test reports](/img/framework/allure/generated_reports.png "Test reports generated")

### Install Railflow CLI

```shell
npm install railflow
```

### Run Railflow CLI and upload test results into TestRail

```shell
npx railflow -k ABCDE-12345-FGHIJ-67890 -url https://testrail.your-server.com/ -u testrail-username -p testrail-password -pr "Railflow Demo" -path section1/section2 -f allure -r $project_directory/target/allure-report/data/test-cases/*.json -sm path
```

Where:

| Key                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                         | Example                                                          |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| -k, --key               | (online activation) License key. Can be set with RAILFLOW_LICENSE environment variable                                                                                                                                                                                                                                                                                                                                                              | -k XXXXX-XXXXX-XXXXX-XXXXX                                       |
| -url, --url             | TestRail instance URL                                                                                                                                                                                                                                                                                                                                                                                                                               | -url https://example.testrail.io                                 |
| -u, --username          | TestRail username. Can be set with RAILFLOW_TR_USER environment variable                                                                                                                                                                                                                                                                                                                                                                            | -u test-username                                                 |
| -p, --password          | TestRail password or API Key. Can be set with RAILFLOW_TR_PASSWORD environment variable                                                                                                                                                                                                                                                                                                                                                             | -p XtpHXiPLEODyhF                                                |
| -pr, --project          | TestRail project name                                                                                                                                                                                                                                                                                                                                                                                                                               | -pr "example project"                                            |
| -path, --test-path      | TestRail test cases path                                                                                                                                                                                                                                                                                                                                                                                                                            | -path "Section1/subsection2/ShoppingCart                         |
| -f, --format            | Report format: 'pytest-railflow' (case insensitive)                                                                                                                                                                                                                                                                                                                    | -f junit                                                         |
| -r, --report-files      | The file path(s) to the test report file(s) generated during the build. User can pass multiple values separated with spaces. Ant-style patterns such as **\*\*/reports/\*.xml** can be used.<br/>`E.g. use **target/reports/\*.xml** `to capture all XML files in **target/reports** directory.                                                                                                                            | -r target/surefire-reports/\*.xml target/failsafe-reports/\*.xml |
| -sm, --search-mode      |  Specifies the test case lookup algorithm. <br/> `name:` search for test case matching the name within the entire test suite. If test case found, update the test case. If test case not found, create a new test case within specified `-path` <br/> `path:` search for test case matching the name within the specified `-path`. If test case found, update the test case. If test case not found, create a new test case within specified `-path`| -sm path                                                         |

Please see [Railflow NPM documentation](https://docs.railflow.io/cli/railflow-npm/) for the all the details about Railflow CLI options.

### View results in TestRail

#### Test run details

![Alt Test run in TestRail](/img/framework/allure/testRail_testrun.png "Test run in TestRail")

#### Test  result details

![Alt Test results in TestRail](/img/framework/allure/testRail_testcase_results.png "Test results in Testrail")

![Alt Test results in TestRail](/img/framework/allure/testRail_testcase_results-2.png "Test results in Testrail")

#### Test result with attachment

![Alt Test results in TestRail with an attachment](/img/framework/allure/testRail_testrun_with_attachment.png "Test results in Testrail with an attachment")

## Sample Allure Project
The source code of the example can be found on [GitHub](https://github.com/railflow/example_allure)
