# 30 Minutes to a Data-Enabled Web Form with MongoDB

Posting a form, capturing data and storing that in a database is a requirement as old as the web itself. Let’s take 30 minutes and build a short, but sweet solution using the MongoDB Platform. We’ll be creating a basic web form using HTML, a bit of JavaScript and storing the data in a MongoDB database. We’ll need a few things before we get moving so take a few minutes and make sure you’ve got the following items in place.


## MongoDB Atlas

To get started, you’ll need to have a MongoDB Atlas account - check out this article on [getting started with MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started/) for some quick information to get you up and running. If you haven’t done this, [register for an account on MongoDB Atlas](https://docs.atlas.mongodb.com/tutorial/create-atlas-account/) and then deploy a free tier instance. Follow these linked guides.

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

## Putting it all together

We're going to be building a web page with HTML tags - the following is a shell, or a template if you like of the html page without the actual content. This will give you a good idea about the various sections we're going to be building in the page.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Stuff
    -->

    <!-- Head links
    -->
  </head>

  <body>
    <!-- Navigation -->

    <!-- Form -->

    <!-- Footer -->

    <!-- Bootstrap core JavaScript -->
  </body>
</html>
```

### HEAD SECTION

The HEAD section is where we configure some basic information about the page such as the description, and title and we link to some additional libraries that will help us style the page and pull in some additional JavaScript frameworks. We're going to use jQuery helpers in our project. JQuery is a framework that simplifies manipulation of HTML document elements. In this project, we're going to use it specifically to simplify grabbing the elements that users put into the fields in our form so that we can use the MongoDB Stitch SDK to insert that data into the database.

```
    <!-- Some basic META information - helps with SEO -->
    <meta name="author" content="Michael Lynn" />
    <title>30 Minutes to a Data Enabled Webform</title>

    <!-- Bootstrap core CSS -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Custom styles for this template -->
    <link href="styles.css" rel="stylesheet" /> <!-- optional additional css styles if'n y'like -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- <script src="https://s3.amazonaws.com/stitch-sdks/js/bundles/4.4.0/stitch.js"></script> -->
    <script src="https://s3.amazonaws.com/stitch-sdks/js/bundles/4.9.0/stitch.js"></script>

    <!-- Our configuration JavaScript - with reference to our Stich App ID -->
    <script src="./config.js"></script>
```

### BODY SECTION

This section is where we leverage the HTML form tags to prompt our user for the data we'll store in MongoDB. I'm using Bootstrap to make things look pretty - but you really only need the HTML tags.

```
    <section class="bg-light">
      <div class="container">
        <h2 class="mb-5 jumbotron text-center">30 Minutes to a Data Enabled Web Form</h2>
        <div class="col-md-12 mx-auto">
          <form>
            <div class="form-group">
              <div class="form-row">
                <label for="name">Name:</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  name="name"
                  id="name"
                  class="form-control"
                />
              </div>
                <div class="row">
                  <div class="col-md-4 form-group">
                      <label for="lat">My Location - Latitude</label>
                      <input type="text" id="lat" name="lat" value="" class="form-control" disabled>
                  </div>
                  <div class="col-md-4">
                      <label for="lon">My Location - Longitude</label>
                      <input type="text" id="lon" name="lon" value="" class="form-control" disabled>
                  </div>
                  <div class="col-md-4 text-middle">
                      <input type="geolocation" type="hidden" id="geolocation" name="geolocation" hidden><br>
                      <button type="button" class="btn btn-lg btn-primary" onclick="showPosition();">Share Location</button>
                  </div>
              </div>
                <div class="form-row">
                        <label for="exp">My experience with MongoDB:</label>
                        <div class="col-lg-12 col-md-12">
                            <select name="exp" id="select_exp" class="form-control">
                                <option value="Brand new to MongoDB">Brand new to MongoDB</option>
                                <option value="Played with it">Played with it</option>
                                <option value="Used in the past">Used in the past</option>
                                <option value="Company Uses">My company uses it</option>
                                <option value="Advanced">Advanced MongoDB User</option>
                            </select>
                        </div>
                    </div>
                <div class="form-row">
                    <label for="role">I am a:</label>
                    <div class="col-lg-12 col-md-12">
                        <select name="role" id="role" class="form-control">
                            <option value="Student">Student</option>
                            <option value="Gamer">Gamer</option>
                            <option value="Developer">Developer/Engineer</option>
                            <option value="DevRel">Developer Advocate/Relations</option>
                            <option value="DevOps">DevOps/SRE</option>
                            <option value="Data Scientist/Analyst">Data Analyst/Scientist</option>
                            <option value="None/Other">Other</option>
                        </select>
                    </div>
                </div>
            <div class="form-row">
              <div class="col-12 col-md-3"><p></p>
                <button class="btn btn-block btn-lg btn-primary"
                    onclick="sendResponse();return false;"
                    class="btn btn-lg btn-success"
                    >
                  Send Response
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
```

### POST BODY SCRIPT SECTION

We'll place our JavaScript elements after the body of our HTML page. This ensures that the entire page loads prior to any of the script elements. In this section, notice we have several functions.

- sendResponse() - No parameters. This invokes a method on our Stitch SDK Client to authenticate with the anonymous credential provider. Then, it calls another function called insertData();
- insertData() - No parameters. This function uses jQuery to obtain the values of the fields in the html form, builds a JSON document and uses the Stitch SDK to send those to the database.
- recordSuccess() - No parameters. This function simply redirects the browser to a new page - where we'll display the data we collected.

```
<!-- Bootstrap core JavaScript -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>

<script>
    const { Stitch, AnonymousCredential } = stitch;

    function sendResponse() {
        client.auth
            .loginWithCredential(new stitch.AnonymousCredential())
            .then(() => insertData())
            .catch(err => console.error(`login failed with error: ${err}`));
    }

    function insertData() {
        var n = new Date();
        var obj = {};
        obj.mdb_created = n;

        obj.name = $("#name").val();
        obj.role = $("#role").val();
        obj.exp = $("#exp").val();

        if ($("#lat").val().length > 0) {
            var lat = $("#lat").val();
            var lon = $("#lon").val();
            lat = parseFloat(lat).toFixed(2);
            lon = parseFloat(lon).toFixed(2);
            var location = {};
            location.type = "Point";
            location.coordinates = new Array(1,2);
            location.coordinates[0] = parseFloat(lon);
            location.coordinates[1] = parseFloat(lat);

            obj.location = location;
            console.log(obj);
        }
        obj.browser = {};
        obj.browser.ua = navigator.userAgent || undefined;
        obj.browser.lang = navigator.language || undefined;
        obj.browser.plat = navigator.platform || undefined;
        obj.owner = client.auth.authInfo.userId;

        db.collection("responses")
            .insertOne(obj)
            .then(recordSuccess)
            .catch(err => console.error(`login failed with error: ${err}`));
    }

    function recordSuccess() {
        window.location = "thankyou.html";
    }

    function showPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            document.getElementById("lat").value = lat;
            document.getElementById("lon").value = lon;
            });
        } else {
            alert("Sorry, your browser does not support HTML5 geolocation.");
        }
    }

</script>
```

## The Magic

Notice the button in the HTML form has a tag called `onClick`. This tag is configured with the name of a JavaScript function that is called when the user clicks the button on the HTML form. This is how we're calling the JavaScript function sendResponse() which in turn calls the function insertData() which sends the data to MongoDB. The Stitch SDK is configured with a reference to the Stitch App ID, which is configured with rules to enable an anonymous user to insert data into the database.

Once the data is inserted into the database, the JavaScript function insertData() completes and if it was successful, it calls recordSuccess() and sends the browser to the location `thankyou.html`.

## Displaying Data

In our `thankyou.html` page, we're doing some interesting things with charts.

In the body of this page, we have a div.

```
<section class="features-icons bg-light text-center">
    <div class="container">
        <div class="jumbotron">
        <h2>Thanks for contributing!</h2>
        <p>
            Here's what the responses look like...
        </p>
        </div>
        <div id="charts"></div>
    </div>
</section>
```

Notice the div with the id `charts`. We're going to reference that in the next stage.

## Scripts

We're first pulling in jquery which will make the job much more efficient. Next, we're creating an array of Chart URI's - these are the URIs for each chart we want to display on the page. We then take the array of URIs and we append those to the div labeled charts from above. This effectively, embeds or inserts the charts into that section of the page.

```
<script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>

<script>
    const CHARTSURIS = [
    "https://charts.mongodb.com/charts-lynn-qercf/embed/charts?id=ff115d78-429a-4857-a284-279e84447ba5&theme=light",
    "https://charts.mongodb.com/charts-lynn-qercf/embed/charts?id=48d13c56-cc25-475d-8112-eb2ac080c889&theme=light",
    "https://charts.mongodb.com/charts-lynn-qercf/embed/charts?id=5589b35a-7a08-438e-9dc8-623a36304e3d&theme=light"
    ];

    $(function() {
        $.each(CHARTSURIS, function(index, uri) {
            $("#charts").append(
            '<iframe style="border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);margin-top:20px;" width="100%" height="480" src="' +
                uri +
                '"></iframe>'
            );
        });
    });
    function toSignup() {
        window.location = "signup.html";
    }
</script>
```
