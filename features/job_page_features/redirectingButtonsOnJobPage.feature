Feature: Redirecting to other pages by buttons on Job page
  I want to check if other pages open after clicking a certain button

  Background:
    Given I open EPAM Careers page
    And I type "javascript" in the Keyword field
    And I click the Find button
    And I click the first appeared job opening

  Scenario: Open Learn more about EPAM page
    When I click the Learn more about EPAM button
    Then the title should be "EPAM | Работа в IT для опытных и начинающих специалистов"

  Scenario: Open the first related job opening page
    When I remember name of the first related job opening
    And I click the first related job opening button
    Then name of the job opening on the job page equals name of the remembered related job opening

  Scenario: Open the first A day in the life page
    When I remember name of the first person in A day in the life section
    And I click the first person from A day in the life section
    Then title of the new page equals name of the remembered person

  Scenario: Open Contact us page
    When I click the Contact us button
    Then the title should be "Learn more about EPAM and Contact Us | EPAM"