self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/Blog": [
    "static/chunks/pages/Blog.js"
  ],
  "/Blog/AddBlog": [
    "static/chunks/pages/Blog/AddBlog.js"
  ],
  "/Book": [
    "static/chunks/pages/Book.js"
  ],
  "/Discover": [
    "static/chunks/pages/Discover.js"
  ],
  "/Discover/[Id]": [
    "static/chunks/pages/Discover/[Id].js"
  ],
  "/Register": [
    "static/chunks/pages/Register.js"
  ],
  "/_error": [
    "static/chunks/pages/_error.js"
  ],
  "/contactus": [
    "static/chunks/pages/contactus.js"
  ],
  "/login": [
    "static/chunks/pages/login.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/404",
    "/Blog",
    "/Blog/AddBlog",
    "/Book",
    "/Discover",
    "/Discover/[Id]",
    "/Register",
    "/_app",
    "/_error",
    "/api/auth/signup",
    "/api/auth/[...nextauth]",
    "/api/contactus",
    "/api/newsletter",
    "/api/user/change-password",
    "/contactus",
    "/login",
    "/login/forget-password",
    "/profile"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()