# Frontend Documentation

The website is available in three languages: english, spanish and brazilian portuguese. You can change the languages clicking in the country flag in the top right. The default language used is Brazilian Portuguese.

## Technologies Used
* Angular 15.0.2
* Bootstrap 4.5.3
* Some other dependencies to create more complex things like pagination, multiselect dropdown, etc...

## Pages

**Landing Page**

* A simple landing page showing the total of users registered, and the total of bug solved. A bug is considered solved if it has a best answer.

<p align="center">
  <img width="70%" height="70%" src="https://user-images.githubusercontent.com/50562060/216739967-aebcb122-f998-4f52-907f-48f0957c3b1f.png">
</p>

**Login and Register**

* Here you can create a new account or login if already registered.
* When logged in, the bearer and refresh token will be saved in the browser session storage.
* The bearer token will be refreshed automatically.

<p align="center" float="left">
  <img width="49%" height="49%" src="https://user-images.githubusercontent.com/50562060/216740417-3cdaa869-d2ba-4116-a268-1ffba44adeee.png">
  <img width="49%" height="49%" src="https://user-images.githubusercontent.com/50562060/216740476-0360002b-720f-4ffb-8aee-8d8a80682aba.png">
</p>

**Explore**

* Here you can see all bugs created, paginated.
* You can filter them by title and categories. If you are authenticated, you can filter to show your bugs only.
* If no bug with the filters inserted was found, it will show a message warning that.

<p align="center">
  <img width="70%" height="70%" src="https://user-images.githubusercontent.com/50562060/216740801-41660c15-9d8d-4c7e-b5fb-47bcd5614a0d.png">
</p>

**Create a new bug**

* Here you can create a new bug, if you are authenticated. 
* You need to fill the title, categories and description fields.
* You can insert a code snippet in your description if you put them between three back quotes.

<p align="center">
  <img width="70%" height="70%" src="https://user-images.githubusercontent.com/50562060/216740899-a353d408-75dd-456f-b13c-ae468edd67d2.png">
</p>

The bug editing page is the same as the creation one, however the data already entered is shown by default.

**Bug Details**

* Here you can see the bug details, and the answers below, paginated. If you are the post owner, you can edit or delete your post. 
* If you are the post owner, you can edit or delete your post.  You can also set a answer as best answer.
* If you are authenticated, you can insert a new answer. If an answer is a best answer, it will have a green border.
* If you are the answer owner, you can edit or delete the answer.

<p align="center">
  <img width="70%" height="70%" src="https://user-images.githubusercontent.com/50562060/216741002-be14d20a-25c0-4f36-a23f-ec90b0043239.png">
</p>
