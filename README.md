
# 30 Minutes to a Data-Enabled Web Form with MongoDB

Posting a form, capturing data and storing that in a database is a requirement as old as the web itself. Let’s take 30 minutes and build a short, but sweet solution using the MongoDB Platform. We’ll be creating a basic web form using HTML, a bit of JavaScript and storing the data in a MongoDB database. We’ll need a few things before we get moving so take a few minutes and make sure you’ve got the following items in place.

## MongoDB Atlas

To get started, you’ll need to have a MongoDB Atlas account - check out this article on [getting started with MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/) for some quick information to get you up and running.  If you haven’t done this, [register for an account on MongoDB Atlas](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/) and then deploy a free tier instance. Follow these linked guides.

## Basic HTML

You will also need a basic understanding of HTML, more specifically, forms. Thankfully, this is readily available [at many places on the web](https://www.w3schools.com/html/html_forms.asp). We’ll be using some very basic tags such as `<form>`, `<input>`, `<select>` to capture input in a form.

## JavaScript

For this brief tutorial, if you can copy/paste JavaScript and tweak a few lines, you should be good to go. But you will want to understand some basics of how JavaScript works. For that, you can head over to [W3Schools](https://www.w3schools.com/js/) for a basic introduction. The key thing here to understand is that JavaScript runs in the browser. We’re going to put some pre-written code that leverages the MongoDB SDK into an HTML file. 

## Code Editor

I use [Visual Studio Code](https://code.visualstudio.com/), but you can use just about any editor as long as you can edit and save your code files. 

## Outline

Here’s an outline of what we’re going to accomplish:

1. Launch a MongoDB Atlas Cluster.
    1. [Add a database user](https://docs.atlas.mongodb.com/security-add-mongodb-users/#add-database-users)
    2. [Add a whitelist](https://docs.atlas.mongodb.com/security-whitelist/)
    3. [Add a Stitch App](https://docs.mongodb.com/stitch/procedures/create-stitch-app/)
    4. [Add an Anonymous User Provider](https://docs.mongodb.com/stitch/authentication/anonymous/)
    5. [Add a Database Rule to allow access to your database for your Stitch App](https://docs.mongodb.com/stitch/mongodb/define-roles-and-permissions/#procedure)
2. Build an HTML Form with some basic input fields.
3. Send the contents of those input fields to MongoDB
4. **BONUS**: Display a chart with the value of those fields.

If you’ve followed the above Atlas Getting Started Guide, you should have a free tier cluster launched. Be sure you follow the guidelines to add a whitelist entry, and create a database user. You’ll need these things to connect to your MongoDB Database.

Now on to building the form. A simple HTML form leverages only a few tags.The following will suffice.


```
<form>
   <label for="name">Name:</label>
   <input type="text" placeholder="Your Full Name" name="name" />
   <label for="lat">My Location - Latitude</label>
   <input type="text" name="lat" value="" >
   <label for="lon">My Location - Longitude</label>
   <input type="text" name="lon" value="">
   <label for="exp">My experience with MongoDB:</label>
   <select name="exp" id="select_exp">
       <option value="Brand new to MongoDB">Brand new to MongoDB</option>
       <option value="Played with it">Played with it</option>
       <option value="Used in the past">Used in the past</option>
       <option value="Company Uses">My company uses it</option>
       <option value="Advanced">Advanced MongoDB User</option>
   </select>
   <label for="role">I am a:</label>
   <select name="role">
       <option value="Student">Student</option>
       <option value="Gamer">Gamer</option>
       <option value="Developer">Developer/Engineer</option>
       <option value="DevRel">Developer Advocate/Relations</option>
       <option value="DevOps">DevOps/SRE</option>
       <option value="Data Scientist/Analyst">Data Analyst/Scientist</option>
       <option value="None/Other">Other</option>
   </select>
   <input type="submit">
</form>
```

This is a very basic form - we can transform this using [Bootstrap](https://getbootstrap.com/) or similar... but for now, let's leave it as is.