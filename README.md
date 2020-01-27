# About

Frontend web application built using Angular 7 that communicate to a backend API service.
The application allow us to add some hashtags that we would like to tracking, and than it will fetch the messages on Twitter API, through a backend application built using Ruby on Rails.
The fetching is update in a interval of 90 seconds each time, but allow you to disable this feature and fetch data manually.

You can also filter for hashtags on Twitter without necessary add it to your list.

### Features:
  - List/Fetching tweets on Twitter API
  - Add/remove hashtags from a list
  - Filter tweets containing some hashtag

### Notes:
The backend application must be running to this frontend application works properly

See: https://github.com/claudioldf/tracking-my-hashtags-backend

### Demo Application:
See: https://tracking-my-hashtags-frontend.herokuapp.com/

# Run on localhost
1. Clone this repository
2. Install `angular` and `yarn`
3. Run on terminal `yarn install`
4. Run on terminal `ng serve`

# Docker image (development environment)
*** TODO ***
