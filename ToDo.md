# To do list

## Design
- [ ] Article card text and layout needs adjustment so that content fits and image is larger to cover more of the container on Desktop, smaller on Mobile view.
- [ ] On article card, add up and bottom arrows on the voting that will later be used
- [ ] NavBar needs more adjustments, there's too much NavBar height
- [ ] Add grow transitions to NavBar buttons
- [ ] Add Light / Dark mode if I have any time through useContext

## Infinite Scroll
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


## CommentAdder
- [ ] Create a full width element with "Leave your comment here", onFocus, return textarea to submit your comment
- [ ] Close the textarea once submitted or clicked on the X button
- [ ] Add infinite scroll
- [ ] Update "Comments" state to increment comment count
- [ ] 



