self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/404": [
    "static/chunks/pages/404.js"
  ],
  "/Blog": [
    "static/chunks/pages/Blog.js"
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
  "/login": [
    "static/chunks/pages/login.js"
  ],
  "/profilePage": [
    "static/chunks/pages/profilePage.js"
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
    "/contactus",
    "/login",
    "/profilePage"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()