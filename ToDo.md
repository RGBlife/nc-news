# To do list

## Design
- [x] Article card text and layout needs adjustment so that content fits and image is larger to cover more of the container on Desktop, smaller on Mobile view.
- [x] On article card, add up and bottom arrows on the voting that will later be used
- [ ] NavBar needs more adjustments, there's too much NavBar height
- [ ] Add grow transitions to NavBar buttons
- [ ] Add Light / Dark mode if I have any time through useContext

## Styling
- [x] Company logo section and nav section text doesn't line up properly, needs to look into and line them up
- [ ] Article page needs some more love along with the comments section / comment adder, comments needs sections and spread out the text on desktop view.
- [ ] Navbar has too much spacing on desktop view


## Infinite Scroll for Home page
- [x] Page refreshes
- [x] Attempts to fetch more data even though all the data has been retrieved
- [x] Initial load it duplicates first batch of articles
- [x] scroll bar resets to the top


## Show created date by mins | hours | days | years ago when created compared to current date
- [x] Util function to compare current date / created date and return the relevant amount of unit to render on the page
- [x] Adjust design for the date unit

## Show loading spinner & show error component if needed
- [ ] Declare a loading / error state with useContext that can be accessed everywhere
- [ ] Create a Loading spinner design
- [ ] Implement the loading spinner in each component being created

## ArticlePage
- [x] Set up routing
- [x] Set up getArticleById API request
- [x] Render data in the page
- [x] Design the page with the data, this will have the article content and then Article info as a sidebar
- [x] Add Footer
- [ ] Add a back to top of the page floating button when scrolling and the top filters start disappearing


## CommentAdder
- [ ] Create a full width element with "Leave your comment here", onFocus, return textarea to submit your comment
- [ ] Close the textarea once submitted or clicked on the X button
- [ ] Add infinite scroll
- [x] Update "Comments" state to increment comment count

## Topics Dropdown
- [ ] Unable to select the existing option from the dropdown, might not be an issue as you can go back a page instead of selecting the topic again
- [ ] Reset the dropdown to default option when going to the homepage or when selecting an article (better change change the dropdown according to which article you are on)
- [ ] Sort topic options alphabetically 

## FilterCard
- [ ] Reset when going back to the home page
- [ ] Ability to reset filters that have already been applied OR have a default filter
- [ ] If user selects "Order By" option without selecting a filter, default to "Date" as this is the default API filter is ordered by

## Bugs
- [ ] When going to coding topic http://localhost:5173/articles?topic=coding, it sometimes skips the first page and only shows the second page.


## Yet to implement
- [ ] Infinite scroll on Comments section
- [ ] Increment/decrement comment votes
- [ ] User login/profile along with avatar upload
- [ ] Add an Article/Topic



