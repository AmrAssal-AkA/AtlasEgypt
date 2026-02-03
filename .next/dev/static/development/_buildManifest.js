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
  "/Discover": [
    "static/chunks/pages/Discover.js"
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
    "/_app",
    "/_error",
    "/api/auth/signup",
    "/api/auth/[...nextauth]",
    "/api/contactus",
    "/api/newsletter",
    "/api/user/change-password",
    "/authentiaction/Register",
    "/authentiaction/forget-password",
    "/authentiaction/login",
    "/contactus",
    "/profile"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()