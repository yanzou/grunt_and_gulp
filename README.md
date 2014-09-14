grunt and gulp
=====================
A comperation of grunt and gulp, 
to find out what's the difference between Grunt and Gulp

steps: 
-------------------

src path
```
src
├── styles
│   ├── main.scss
│   ├── _navbar.scss
│   └── _footer.scss
├── app
│   ├── main.coffee
│   ├── module_1.coffee
│   └── module_2.coffee
└── tpls
    ├── _footer.jade
    ├── index.jade
    ├── _navbar.jade
    └── _mainContent.jade
```

build path
```
public
├── assets
│   ├── styles
│   │   └── main.css
│   └── js
│       └── main.js
└── index.html
```


1. clear bulid path
2. join all scss file --> compile to "main.css" --> copy to bulid path
3. join all coffee file --> compile to "main.js" --> copy to bulid path
4. compile index.jade to index.html  --> copy to bulid path 
