Red Eagle Coding Standard...
=============================
------------------------------------------------------------




index.html
==========
    The index.html lives at the root of front-end structure. The file will primarily handle loading in all the libraries and Angular elements.

Assets Folder
=============
    Will contain all assets needed for app that are not related to Angular code (i.e. css, images, custom javascript, libraries)

App Folder
==========
    The majority of the application will live here. There is two subfolders and a couple js files at the root of the folder. The 
    app.module.js file will handle the setup of the app, load in Angularjs dependencies, app.route.js file will handle all the routes
    and the route configuration. Then there is the components and shared folders:
    
Components Folder
-----------------
    Components folder will contain the actual sections for the app (views, directives, and services for that specific
    section of the site (each page should have it's own subfolder with it's own controller, services and HTML files).
    
    Each component will resemble a mini-MVC application by having a view, controller and potentially services file(s).
    If the component has multiple related views, it will be a good idea to further separate these files into views, controllers,
    services subfolders.
    
Core Folder
-----------
    Core Folder will live under the components folder and will house components in the app that will be over-arching
    or core to the application such as the header and footer, possibly the right rail will go in this folder as well.

        
Shared Folder
-------------
    The shared folder will contain the individual features that the app will have. These features will be directives that will need to 
    be reused on multiple pages. Each component here should have it's own subfolder that contains the directive javascript file and the template
    HTML file.
    This will allow us to have definitive components for the application that will be  the same across the site. (Note:
    when possible build it so a consumer of your component can pass in options to extend it.
    






