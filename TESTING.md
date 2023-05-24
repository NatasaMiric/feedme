# Testing

* [Validator Testing](#Validator-testing)
    * [Lighthouse](#Lighthouse) 
* [Manual testing](#Manual-testing)
    * [Testing User Stories](#Testing-user-stories)
* [Bugs](#Bugs)

## Validator testing

All Java Script code has been checked on online [eslinter](https://eslint.org/play/) and there wasn't any reported error. 

The CSS code has been checked on [W3C CSS Jigsaw validator](https://jigsaw.w3.org/css-validator/) and passed without errors. 

### Lighthouse


## Manual

### Testing User Stories

| As a/an | I want to be able to ... | So that I can... | How is this achieved? | Evidence |
| :--- | :--- | :---| :--- | :---: |
| user | view a navbar from every page | navigate easily between pages | The navbar is located on top of every page |   | 
| logged out user | see sign in and sign up options | sign in/sign up | These options are located on navbar. If the user clicks on these link he should be redirected to sign in /sign up pages  |   |
| user | create a new account | access all the features for signed up users | The link for sign up is located in navbar that user should click and user will be redirected to sign up page. There should user fill out his username and password and click sign up button |     |
| user | sign in to the app | access functionality for logged in users | The link for sign in is located in navbar that user should click and user will be redirected to sign in page. There should user fill out his username and password and click sign in button |     |
| user | tell if I am logged in or not | log in if I need to | If the user is logged in, he should be able to see a sign out link on navbar. Otherwise, if the user is logged out, he will find the sign in link. |      |
| logged in user | create recipes | share my recipes with the people that have same interest for cooking like me | If the user is logged in,he should be able to see and click on Add recipe button that is located on navbar. This action will take user to create recipe page where the user should upload an image by clicking on upload image button, write content in all fields, select an option for category and difficulty and click on save button below the form |    |
| logged in user and recipe author | edit my recipe  | I can make corrections | User should click on recipe that he wants to edit then he will be redirected to recipe page where he should find three dots on top, right corner of the recipe and click on it. After click, there will be an icon for edit that user should click and will be redirected to edit recipe page. User should be able to make changes in every form field and upload another image by clicking on change image button  |      |   
| logged in user and recipe author | delete my recipe  | I can manage my own recipes  | User should click on recipe that he wants to delete then he will be redirected to recipe page where he should find three dots on top, right corner of the recipe and click on it. After click, there will be an icon for deleting that user should click on and there will pop up confirmation field to confirm if he wants to delete a recipe  |   |
| visiting user | view all the most recent recipes, ordered by most recently created first | be up to date with the newest content | User should be able to find the recipes ordered by most recent date by accessing the home page |   |
|  visiting user  | see the most liked recipes| know which recipes are popular | When the user clicks on home, feed and bookmarked page, the user should be able to see most liked recipes section on right side of the page |        |
| logged in user | view followed users' posts  | keep up with my favourite users |  When the user clicks on feed located on navbar, the user will be redirected to feed page where will be displayed the recipes by users that he follows |      |
| logged in user | like a recipe | show my support to the author of the recipe | When the user click on the heart icon located on recipe section, the heart will become red which means that the liking has succeded |   |
| logged in user | unlike a post | express that my interest has faded away | When the user clicks on the red heart located on recipe, the icon is going to switch to white color which show that unliking succeded |     |
| logged in user | add comments to a recipe | share my thoughts about the recipe | When the user clicks on recipe and gets redirected to another page, below the recipe will be displayed a comment form where user should write a text and click on post button |      |
| visiting user | see how long ago a comment was made | know how old a comment is | User should be able to find the time of each comment next to the name of the user taht posted the comment |       |
| visiting user | read comments on recipe  | read what other users think about the recipe | When user clicks on comment icon on recipe, he will be redirected to another page where will be all comments listed below the recipe |       |
| owner of a comment  | delete my comment | control removal of my comment from the application | When the user clicks on three dots located in comment form and clicks on delete icon, then will pop up the delete confirmation where user should click delete button  |     |
| owner of a comment | edit my comment  | fix or update my existing comment | When the user clicks on three dots located in comment form and clicks on edit icon, the user is able to change the comment and click on save |     |
| logged in user | bookmark the recipes | store the recipes that I like the most  | When the user clicks on bookmark icon that is located on recipe, the icon becomes green |    |
| logged in user | view all bookmarked recipes | find easier the recipes that I planned to make | When the user clicks on bookmarked button located on navbar he will be redirected to bookmarked page where will be displayed all recipes that the user bookmarked |        |
| logged in user| view the details of bookmarked recipe | know how to prepare it  | When the user clicks on recipe, he will be redirected to another page where the all information about the recipe will be displayed |  |
| logged in user | update my username and password | change my display name and keep my profile secure| When the user clicks on Profile button on navbar, he will be redirected to his profile page where he will find the three dots (options menu) on top, right corner. User should be able to click on the options menu and choose to update username and update password. If the user clicks on either of these options, he will be redirected to another page where he should be able to write the new username or password and click on save |       |
| logged in user |  edit my profile  |  change my profile picture and bio | When the user clicks on Profile button on navbar, he will be redirected to his profile page where he will find the three dots (options menu) on top, right corner. User should be able to click on the options menu and choose to update profile. Then he will be redirected to another page where he should be able to change the image by clicking on the button and write new bio content and click save  |   |
| visiting user | view all the recipes by a specific user | catch up on their latest recipes | When the user goes to another user's profile by clicking on the users profile image or name, he will be redirected to user's profile where the user can scroll through all the recipes that user has posted (newest recipes first) |       |
| visiting user |  view statistics about a specific user: bio,number of posted recipes | know how active they are | When the user goes to another user's profile by clicking on the users profile image or name, he will be redirected to user's profile where the user can find on top of the page these profile details  |  |
|  visiting user  | see the most followed profiles| know which profiles are popular | When the user clicks on home, feed and bookmarked page, the user should be able to see most followed profiles section on right side of the page  |    |
| visiting user | search for recipes by author or title | find the recipes I am most interested in | When the user goes to home, feed or bookmarked page, the user should locate the search bar on top of the pages where should he input author, title or ingredient of the recipe and the matching recipe will be displayed below |   |
| logged in user | follow a profile | show my interest in someone's content | The user should click on follow button located on user's profile page or in most followed profile section, and after that the button will transform to unfollow |   |
| logged in user | unfollow a profile | show that my interest in someone's content has faded away and remove their posts from my feed | The user should click on unfollow button located on user's profile page or in most followed profile section, and after that the button will transform to follow |       |


### Full Testing

Full testing was performed on the following devices:

* Mobile:
    * Samsung Galaxy S10+
    * Samsung Galaxy S20 Ultra
    * iPhone 12 Pro
    * iPhone 6/7/8 Plus

* Tablet:
    iPad Pro   

* Desktop:
    32 inch ultrawide Monitor

Testing was also performed using the following browsers:

* Chrome
* FireFox
* Opera


| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |