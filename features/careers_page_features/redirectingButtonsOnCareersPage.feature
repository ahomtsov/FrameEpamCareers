Feature: Redirecting to other pages by buttons on Careers page
  I want to check if other pages open after clicking a certain button

  Background:
    Given I open EPAM Careers page

  Scenario: Open Instagram page in a new tab
    When I click the Instagram title button
    Then the title of a new tab should contain "EPAM Global"
    And the URL of a new tab should contain "instagram"

  @redirectingToOtherPagesFromCareersPage
  Scenario Outline: Open "<title>"
    When I click the "<button name>" button from "<section name>" section
    Then the title should be "<title>"

    Examples:
      |button name  |section name                                      |title                               |
      |Learn more   |Are You Open to Relocating?                       |EPAM Without Borders \| EPAM Careers|
      |Learn more   |Why join epam                                     |Flip the Script Careers Blog \| EPAM|
      |Learn more   |EPAM WITHOUT BORDERS                              |EPAM Without Borders \| EPAM Careers|
      |Apply        |Don't see the dream job you were hoping to find?  |Apply Now                           |

  #Scenario: Open "story of the first person" page
  #  When I click the "READ MORE" button about "Salman Talat" from "Who we are" section
  #  Then the title should be "Salman Talat"