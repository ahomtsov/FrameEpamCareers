Feature: Redirecting to other pages by buttons on Careers page
  I want to check if other pages open after clicking a certain button

  Background:
    When I open the "EPAM Careers" page
    Then I should be on the "EPAM Careers" page

  Scenario: Open Instagram page in a new tab
    When I click the button number "1" from "Instagram title field" buttons
    And I go to the opened "Instagram" tab
    Then I should be on the "Instagram" page
    And the title of a new tab should contain "EPAM Global"
    And the URL of a new tab should contain "instagram"

  @redirectingToOtherPagesFromCareersPage
  Scenario Outline: Open "<title>"
    When I click the "<button name>" button from the "<section name>" section
    Then the title should be "<title>"

    Examples:
      |button name  |section name                                      |title                               |
      |Learn more   |Are You Open to Relocating?                       |EPAM Without Borders \| EPAM Careers|
      |Learn more   |Why join epam                                     |Flip the Script Careers Blog \| EPAM|
      |Learn more   |EPAM WITHOUT BORDERS                              |EPAM Without Borders \| EPAM Careers|
      |Apply        |Don't see the dream job you were hoping to find?  |Apply Now                           |