const questionBank = {
    frontend: {
        
            react: {
              Junior: [
                { question: "What is JSX in React?", evaluationCriteria: "Understands JSX syntax and how it compiles to React.createElement." },
                { question: "How do you pass data between components in React?", evaluationCriteria: "Should mention props, unidirectional data flow." },
                { question: "What is a functional component?", evaluationCriteria: "Explanation of stateless components." },
                { question: "What is the Virtual DOM?", evaluationCriteria: "Understands the concept of virtual DOM and its performance advantages." },
                { question: "What are React hooks?", evaluationCriteria: "Should mention the use of useState, useEffect, and other hooks." },
                { question: "What is the difference between controlled and uncontrolled components?", evaluationCriteria: "Understands the concepts of managed state in React." },
                { question: "What is useEffect hook?", evaluationCriteria: "Explains the purpose and use cases of useEffect for side effects." },
                { question: "What is the difference between class components and functional components?", evaluationCriteria: "Knows the distinctions between class-based components and functional components." },
                { question: "What are props in React?", evaluationCriteria: "Should understand how props pass data to child components." },
                { question: "How do you handle events in React?", evaluationCriteria: "Should mention event handling with JSX syntax." }
              ],
              Mid: [
                { question: "What is the Context API in React?", evaluationCriteria: "Understands global state management in React." },
                { question: "What is React Router?", evaluationCriteria: "Explains routing within a React app." },
                { question: "What is Redux and how does it work?", evaluationCriteria: "Should explain state management, actions, reducers, and the store." },
                { question: "What are higher-order components?", evaluationCriteria: "Explains how HOCs are used to enhance components." },
                { question: "How do you optimize performance in React?", evaluationCriteria: "Should mention techniques like lazy loading, memoization." },
                { question: "What is error boundary in React?", evaluationCriteria: "Explains how error boundaries catch JavaScript errors in the UI." },
                { question: "What is server-side rendering (SSR) in React?", evaluationCriteria: "Understands SSR and its performance benefits." },
                { question: "What is React’s reconciliation algorithm?", evaluationCriteria: "Explains how React optimizes re-rendering using the diffing algorithm." },
                { question: "What are render props?", evaluationCriteria: "Explains a pattern where a function prop is used to share code between components." },
                { question: "What are React hooks and how do they differ from class components?", evaluationCriteria: "In-depth knowledge of hooks like useState, useEffect, and others." }
              ],
              Senior: [
                { question: "What is React Fiber?", evaluationCriteria: "Understands the new reconciliation algorithm introduced in Fiber." },
                { question: "What is code splitting in React?", evaluationCriteria: "Uses dynamic imports and lazy loading for performance optimization." },
                { question: "What is the purpose of useCallback and useMemo hooks?", evaluationCriteria: "Explains how to memoize functions and values to optimize performance." },
                { question: "What is React’s Context API and when would you use it?", evaluationCriteria: "Knows when to use Context API for global state management." },
                { question: "How do you manage code splitting in React?", evaluationCriteria: "Implementing dynamic imports and React.lazy to reduce bundle sizes." },
                { question: "How would you implement server-side rendering with React?", evaluationCriteria: "Uses frameworks like Next.js or ReactDOMServer." },
                { question: "What is React’s Suspense and how does it work?", evaluationCriteria: "Explains the handling of asynchronous rendering in React." },
                { question: "How do you handle authentication in React?", evaluationCriteria: "Uses token-based authentication like JWT and libraries such as OAuth." },
                { question: "What is the significance of PureComponent?", evaluationCriteria: "Explains performance optimization by avoiding unnecessary re-renders." },
                { question: "What is the role of PropTypes in React?", evaluationCriteria: "Explains how PropTypes can be used for runtime validation of props." }
              ]
            },
            angular: {
              Junior: [
                { question: "What is Angular?", evaluationCriteria: "Understanding the basics of the Angular framework." },
                { question: "What are components in Angular?", evaluationCriteria: "Explains the building blocks of Angular apps." },
                { question: "What is data binding in Angular?", evaluationCriteria: "Should mention one-way and two-way data binding." },
                { question: "What is Angular CLI?", evaluationCriteria: "Explains the command-line interface tool for Angular development." },
                { question: "What is dependency injection in Angular?", evaluationCriteria: "Understands how Angular uses DI to manage services." },
                { question: "What are directives in Angular?", evaluationCriteria: "Explains custom behavior in templates with directives." },
                { question: "How do you create services in Angular?", evaluationCriteria: "Mentions the creation of services for reusable logic." },
                { question: "What is Angular routing?", evaluationCriteria: "Explains the routing system in Angular applications." },
                { question: "What is the difference between Angular and React?", evaluationCriteria: "Comparing Angular’s two-way data binding vs React’s one-way data flow." },
                { question: "What is the role of observables in Angular?", evaluationCriteria: "Explains how observables work in reactive programming." }
              ],
              Mid: [
                { question: "What is Angular Module?", evaluationCriteria: "Explains how Angular modules organize code." },
                { question: "What is RxJS?", evaluationCriteria: "Explains the use of reactive programming in Angular using RxJS." },
                { question: "What are Angular lifecycle hooks?", evaluationCriteria: "Knows when to use hooks like ngOnInit, ngOnChanges, etc." },
                { question: "What is the difference between a component and a directive?", evaluationCriteria: "Clear distinction between components and directives in Angular." },
                { question: "What is ngModel in Angular?", evaluationCriteria: "Understands two-way binding using ngModel." },
                { question: "What is lazy loading in Angular?", evaluationCriteria: "Explains how to load modules on demand to improve performance." },
                { question: "What is the difference between observables and promises?", evaluationCriteria: "Understands when to use observables versus promises for async tasks." },
                { question: "What is Angular Universal?", evaluationCriteria: "Explains server-side rendering (SSR) in Angular." },
                { question: "What are Angular services and how do you use them?", evaluationCriteria: "Explains the concept and usage of services in Angular." },
                { question: "How do you handle forms in Angular?", evaluationCriteria: "Knows both template-driven and reactive forms in Angular." }
              ],
              Senior: [
                { question: "What is Angular change detection?", evaluationCriteria: "Explains how Angular tracks and updates the UI based on changes." },
                { question: "What is ahead-of-time compilation (AOT) in Angular?", evaluationCriteria: "Explains the optimization of templates during the build phase." },
                { question: "How would you scale an Angular application?", evaluationCriteria: "Explains lazy loading, modularization, and performance optimizations." },
                { question: "What is Angular’s HttpClient?", evaluationCriteria: "Understanding Angular’s client for making HTTP requests." },
                { question: "What are Angular decorators?", evaluationCriteria: "Explains decorators such as @Component, @Injectable, etc." },
                { question: "What are Angular interceptors?", evaluationCriteria: "Used to modify HTTP requests or responses globally." },
                { question: "How do you test Angular applications?", evaluationCriteria: "Explains unit and integration tests using Jasmine and Karma." },
                { question: "How do you optimize Angular application performance?", evaluationCriteria: "Discusses change detection strategies and lazy loading." },
                { question: "What is dependency inversion in Angular?", evaluationCriteria: "Explains dependency management in Angular using services and DI." },
                { question: "How do you manage authentication and authorization in Angular?", evaluationCriteria: "Explains JWT, guards, and role-based access control." }
              ]
            },
            html: {
              Junior: [
                { question: "What is HTML?", evaluationCriteria: "Understanding the structure of web pages." },
                { question: "What is the purpose of the `<head>` element?", evaluationCriteria: "Contains metadata and links to resources like stylesheets and scripts." },
                { question: "What is semantic HTML?", evaluationCriteria: "Using meaningful tags like <article>, <section>, <header>, etc." },
                { question: "What is the difference between block-level and inline elements?", evaluationCriteria: "Block-level elements take up the full width, inline elements take up only necessary width." },
                { question: "What are forms in HTML?", evaluationCriteria: "Explains the <form> element and its input fields." },
                { question: "What are meta tags?", evaluationCriteria: "Used for metadata such as description, keywords, and viewport settings." },
                { question: "What are attributes in HTML?", evaluationCriteria: "Attributes provide additional information about elements, e.g., `class`, `id`, `href`." },
                { question: "What is the purpose of the `<div>` element?", evaluationCriteria: "Used as a container for content, often for layout." },
                { question: "What is the difference between `<ol>` and `<ul>`?", evaluationCriteria: "Ordered lists (`<ol>`) are numbered, unordered lists (`<ul>`) are bulleted." },
                { question: "What is an anchor tag in HTML?", evaluationCriteria: "The `<a>` tag is used to create hyperlinks." }
              ],
              Mid: [
                { question: "What is the difference between `<section>` and `<div>`?", evaluationCriteria: "Explains the use of `<section>` for thematic groupings vs `<div>` as a generic container." },
                { question: "What are HTML5 APIs?", evaluationCriteria: "Explains APIs like localStorage, geolocation, and Canvas API." },
                { question: "What is the `<!DOCTYPE>` declaration?", evaluationCriteria: "Declares the document type and version of HTML." },
                { question: "What are forms and inputs in HTML?", evaluationCriteria: "Knows about form elements, input types, and validation." },
                { question: "What is the purpose of `<meta charset='UTF-8'>`?", evaluationCriteria: "Ensures correct character encoding." },
                { question: "How do you embed videos in HTML?", evaluationCriteria: "Using the `<video>` tag to embed multimedia content." },
                { question: "What is the difference between `<em>` and `<strong>`?", evaluationCriteria: "`<em>` is for emphasizing text, `<strong>` is for strong importance." },
                { question: "What is the difference between HTML and XHTML?", evaluationCriteria: "XHTML is stricter in syntax, requiring all tags to be properly closed." },
                { question: "What are ARIA roles in HTML?", evaluationCriteria: "Explains how ARIA attributes enhance accessibility." },
                { question: "What is the purpose of `<head>` and `<body>`?", evaluationCriteria: "Explains their distinct roles in an HTML document." }
              ],
              Senior: [
                { question: "What is responsive web design?", evaluationCriteria: "Designing websites to be usable across devices with varying screen sizes." },
                { question: "What are the best practices for SEO in HTML?", evaluationCriteria: "Using semantic tags, metadata, and correct HTML structure." },
                { question: "What is the role of `<header>`, `<footer>`, and `<nav>`?", evaluationCriteria: "Used for defining the header, footer, and navigation of a page respectively." },
                { question: "What is the purpose of the `<canvas>` element?", evaluationCriteria: "Allows drawing graphics, such as graphs or animations, on the fly." },
                { question: "How do you optimize HTML for accessibility?", evaluationCriteria: "Use ARIA roles, alternative text for images, and proper heading structure." },
                { question: "What is HTML5 localStorage?", evaluationCriteria: "Provides local storage in the browser for persisting data." },
                { question: "What are semantic elements and why are they important?", evaluationCriteria: "Use of meaningful elements like <article>, <section>, <nav> for better SEO and accessibility." },
                { question: "What is progressive enhancement?", evaluationCriteria: "Building a base experience that works for all users and adding enhanced features for more capable browsers." },
                { question: "What are `<iframe>` and its security considerations?", evaluationCriteria: "Explains embedding other documents and the security risks (XSS, clickjacking)." },
                { question: "How do you improve the load time of a webpage?", evaluationCriteria: "Techniques like lazy loading, caching, and reducing HTTP requests." }
              ]
            },
            css: {
              Junior: [
                { question: "What is the difference between class and ID?", evaluationCriteria: "Specificity and reuse." },
                { question: "How do you center a div?", evaluationCriteria: "Flexbox or margin auto." },
                { question: "What is specificity in CSS?", evaluationCriteria: "How styles are prioritized." },
                { question: "What is a pseudo-class?", evaluationCriteria: "e.g., :hover, :focus." },
                { question: "How do media queries work?", evaluationCriteria: "Responsive breakpoints." },
                { question: "What is the box model?", evaluationCriteria: "Padding, border, margin, content." },
                { question: "What are CSS variables?", evaluationCriteria: "Custom properties." },
                { question: "Difference between relative and absolute?", evaluationCriteria: "Positioning context." },
                { question: "What is z-index?", evaluationCriteria: "Stacking order of elements." },
                { question: "How does inheritance work in CSS?", evaluationCriteria: "Parent passes down properties." }
              ],
              Mid: [
                { question: "What is Flexbox?", evaluationCriteria: "A layout model that allows flexible and efficient layouts." },
                { question: "What is Grid in CSS?", evaluationCriteria: "A 2-dimensional layout system for creating complex web designs." },
                { question: "What are CSS animations?", evaluationCriteria: "Creating animations using @keyframes and animation properties." },
                { question: "What is the difference between padding and margin?", evaluationCriteria: "Padding is inside an element, margin is outside." },
                { question: "What is BEM methodology?", evaluationCriteria: "Block-Element-Modifier naming convention for CSS classes." },
                { question: "What is the purpose of `display: none` vs `visibility: hidden`?", evaluationCriteria: "Explains the visibility and layout differences." },
                { question: "What are pseudo-elements in CSS?", evaluationCriteria: "e.g., `::before` and `::after` for inserting content into an element." },
                { question: "What is responsive web design?", evaluationCriteria: "Designing layouts that work on any screen size, using media queries." },
                { question: "What is `z-index` and how does it work?", evaluationCriteria: "Layering elements along the z-axis." },
                { question: "How do you create a responsive navigation bar?", evaluationCriteria: "Using flexbox, media queries, or hamburger menus." }
              ],
              Senior: [
                { question: "How do you optimize CSS for performance?", evaluationCriteria: "Minification, CSS sprites, removing unused CSS." },
                { question: "What is the importance of critical CSS?", evaluationCriteria: "Loading essential styles first to improve page load speed." },
                { question: "How do you manage large CSS codebases?", evaluationCriteria: "Using pre-processors like SASS/LESS, modular CSS, and methodologies like BEM." },
                { question: "What are CSS preprocessors?", evaluationCriteria: "Explains the benefits of SASS, LESS, and their features like variables and mixins." },
                { question: "What is the cascade in CSS?", evaluationCriteria: "Explains how CSS rules are applied and prioritized." },
                { question: "How does CSS Grid differ from Flexbox?", evaluationCriteria: "Grid is for 2D layouts, Flexbox is for 1D." },
                { question: "What is the purpose of `will-change` in CSS?", evaluationCriteria: "Optimizes an element for future changes, improving performance." },
                { question: "What is the difference between `position: absolute` and `position: fixed`?", evaluationCriteria: "Positioning context and viewport relation." },
                { question: "What are `@font-face` and web fonts?", evaluationCriteria: "Loading and embedding custom fonts on the webpage." },
                { question: "How do you optimize CSS for different screen resolutions?", evaluationCriteria: "Using responsive units like rem, em, and media queries." }
              ]
            },
            js: {
                Junior: [
                  { question: "What is the difference between let, const, and var?", evaluationCriteria: "Explains scope and immutability differences clearly." },
                  { question: "What are JavaScript closures?", evaluationCriteria: "Mentions functions retaining access to outer scope." },
                  { question: "What is the difference between == and === in JavaScript?", evaluationCriteria: "Explains type coercion differences." },
                  { question: "How do you handle errors in JavaScript?", evaluationCriteria: "Using try-catch blocks and handling promise rejections." },
                  { question: "What is a promise in JavaScript?", evaluationCriteria: "Explains how promises handle asynchronous operations." },
                  { question: "What are arrow functions in JavaScript?", evaluationCriteria: "Short syntax for functions with lexical scoping of `this`." },
                  { question: "What are the primitive types in JavaScript?", evaluationCriteria: "Explains number, string, boolean, undefined, null, symbol." },
                  { question: "What is event bubbling in JavaScript?", evaluationCriteria: "Describes the event propagation mechanism." },
                  { question: "What are template literals in JavaScript?", evaluationCriteria: "Explains string interpolation using backticks." },
                  { question: "What is the purpose of `this` in JavaScript?", evaluationCriteria: "Explains how `this` works in different contexts." }
                ],
                Mid: [
                  { question: "What is the event loop in JavaScript?", evaluationCriteria: "Explains the concurrency model and call stack mechanism." },
                  { question: "What is the difference between `null` and `undefined`?", evaluationCriteria: "Explains type and usage differences." },
                  { question: "What is the DOM?", evaluationCriteria: "Explains the document object model for interacting with HTML and XML." },
                  { question: "What is AJAX?", evaluationCriteria: "Describes asynchronous HTTP requests in JavaScript." },
                  { question: "What are higher-order functions?", evaluationCriteria: "Functions that accept or return other functions." },
                  { question: "How do you handle asynchronous programming in JavaScript?", evaluationCriteria: "Using promises and async/await." },
                  { question: "What is a callback function in JavaScript?", evaluationCriteria: "Explains callback functions for asynchronous operations." },
                  { question: "What is the difference between `call()` and `apply()` in JavaScript?", evaluationCriteria: "Explains their differences in invoking functions with context." },
                  { question: "What is destructuring in JavaScript?", evaluationCriteria: "Extracting values from objects and arrays." },
                  { question: "How does JavaScript handle memory management?", evaluationCriteria: "Automatic garbage collection and memory allocation." }
                ],
                Senior: [
                  { question: "What are design patterns in JavaScript?", evaluationCriteria: "Common solutions to software design problems like Singleton, Factory." },
                  { question: "What is functional programming in JavaScript?", evaluationCriteria: "Emphasizes immutability, first-class functions, and higher-order functions." },
                  { question: "What is event sourcing?", evaluationCriteria: "Storing changes as events rather than the current state." },
                  { question: "What is WebAssembly?", evaluationCriteria: "Running code compiled from other languages in the browser." },
                  { question: "What is the difference between synchronous and asynchronous code?", evaluationCriteria: "Explains blocking vs non-blocking execution." },
                  { question: "What are JavaScript modules?", evaluationCriteria: "Using `import` and `export` to modularize code." },
                  { question: "What are Web Workers?", evaluationCriteria: "Running JavaScript code in background threads." },
                  { question: "What is a closure in JavaScript?", evaluationCriteria: "The ability of a function to remember its lexical scope." },
                  { question: "What is a proxy in JavaScript?", evaluationCriteria: "Intercepts and defines custom behavior for object operations." },
                  { question: "What is a service worker?", evaluationCriteria: "Allows intercepting network requests for offline-first experiences." }
                ]
              },
              
           bootstrap: {
                  Junior: [
                    { question: "What is Bootstrap?", evaluationCriteria: "A front-end framework for developing responsive websites." },
                    { question: "How do you include Bootstrap in a project?", evaluationCriteria: "Using CDN or by downloading Bootstrap files." },
                    { question: "What is the grid system in Bootstrap?", evaluationCriteria: "A layout system that uses 12 columns to create responsive designs." },
                    { question: "What is the purpose of `container` in Bootstrap?", evaluationCriteria: "Provides a responsive fixed-width container for your layout." },
                    { question: "What are `row` and `col` classes in Bootstrap?", evaluationCriteria: "Used to create a responsive grid structure." },
                    { question: "What is a `jumbotron` in Bootstrap?", evaluationCriteria: "A large, prominent component used for showcasing content or information." },
                    { question: "How do you create a button in Bootstrap?", evaluationCriteria: "Using `btn` class with different button styles like `btn-primary`, `btn-danger`." },
                    { question: "What is the purpose of the `.img-fluid` class?", evaluationCriteria: "Makes an image responsive by adjusting its size to fit the container." },
                    { question: "How do you implement a carousel in Bootstrap?", evaluationCriteria: "Using the `carousel` component along with `.carousel-item` and `.carousel-control`." },
                    { question: "What is the role of `navbar` in Bootstrap?", evaluationCriteria: "Creates a responsive navigation bar with options like links and dropdowns." }
                  ],
                  Mid: [
                    { question: "What is the difference between `container` and `container-fluid`?", evaluationCriteria: "The `container` class has fixed width while `container-fluid` spans the entire width." },
                    { question: "What is the `.d-flex` class in Bootstrap?", evaluationCriteria: "Used to apply the flexbox layout model to an element." },
                    { question: "How do you implement a modal in Bootstrap?", evaluationCriteria: "Using `.modal`, `.modal-dialog`, and `.modal-content` to create a dialog box." },
                    { question: "What is a `.card` in Bootstrap?", evaluationCriteria: "A component that provides a flexible and extensible content container with options for headers, footers, and media." },
                    { question: "What is the `.alert` class used for?", evaluationCriteria: "To display feedback messages like success, warning, or error alerts." },
                    { question: "What is the `.btn-group` class?", evaluationCriteria: "Used to group multiple buttons together into a button group." },
                    { question: "How do you create a responsive table in Bootstrap?", evaluationCriteria: "Using the `.table` class along with `.table-responsive` to make it scrollable horizontally." },
                    { question: "What are the `.offset-*` classes used for?", evaluationCriteria: "Used to offset columns in the grid system for alignment." },
                    { question: "What is the purpose of `.text-center`, `.text-right`, and `.text-left` classes?", evaluationCriteria: "Align text content to the left, center, or right respectively." },
                    { question: "How do you make a layout with Bootstrap's flexbox?", evaluationCriteria: "Using `.d-flex`, `.justify-content-*`, and `.align-items-*` classes to create flexible layouts." }
                  ],
                  Senior: [
                    { question: "How do you customize Bootstrap's default styles?", evaluationCriteria: "By overriding CSS classes or using custom themes and variables in SCSS." },
                    { question: "What is the role of the `.order-*` classes in Bootstrap?", evaluationCriteria: "Used to change the order of flex items in a flexbox layout." },
                    { question: "How does Bootstrap handle responsive design?", evaluationCriteria: "Using the grid system and media queries to adjust layout for different screen sizes." },
                    { question: "What is the `.shadow` class in Bootstrap?", evaluationCriteria: "Used to apply shadow effects on elements for emphasis." },
                    { question: "How do you implement a sticky footer in Bootstrap?", evaluationCriteria: "By using `.fixed-bottom` or custom flexbox layouts." },
                    { question: "What is the purpose of `.dropdown-toggle` in Bootstrap?", evaluationCriteria: "To indicate an element as a dropdown toggle and enable dropdown functionality." },
                    { question: "How do you make a Bootstrap layout that adapts to both mobile and desktop screens?", evaluationCriteria: "By using Bootstrap’s responsive grid and utility classes to change the layout based on screen size." },
                    { question: "What is the `.sr-only` class in Bootstrap?", evaluationCriteria: "Hides elements visually while keeping them accessible for screen readers." },
                    { question: "How do you create a custom theme in Bootstrap?", evaluationCriteria: "By modifying Bootstrap's SCSS variables or using the Bootstrap Theme Customizer." },
                    { question: "What are the key differences between Bootstrap 4 and Bootstrap 5?", evaluationCriteria: "Bootstrap 5 removed jQuery, introduced custom form controls, and updated the grid system." }
                  ]
                },
                
                    nextjs: {
                      Junior: [
                        { 
                          question: "What is Next.js?", 
                          evaluationCriteria: "Next.js is a React framework that provides server-side rendering, static site generation, and routing out of the box."
                        },
                        { 
                          question: "What is the difference between client-side rendering and server-side rendering?", 
                          evaluationCriteria: "Client-side rendering occurs in the browser, while server-side rendering happens on the server, providing better performance and SEO benefits."
                        },
                        { 
                          question: "How do you create pages in Next.js?", 
                          evaluationCriteria: "Pages are created by adding React components to the `pages` directory. The file name becomes the URL path."
                        },
                        { 
                          question: "What is the `getStaticProps` function used for in Next.js?", 
                          evaluationCriteria: "`getStaticProps` is used for static generation and allows you to fetch data at build time, which is then passed as props to the page component."
                        },
                        { 
                          question: "What is the `Link` component in Next.js?", 
                          evaluationCriteria: "`Link` is used for client-side navigation between pages in Next.js without full page reloads."
                        },
                        { 
                          question: "What are dynamic routes in Next.js?", 
                          evaluationCriteria: "Dynamic routes are created using file names enclosed in square brackets (e.g., `[id].js`), which can handle variable parts of a URL."
                        },
                        { 
                          question: "How does Next.js handle static site generation (SSG)?", 
                          evaluationCriteria: "Next.js uses `getStaticProps` to generate static pages at build time, improving performance and SEO."
                        },
                        { 
                          question: "What is the purpose of `getServerSideProps` in Next.js?", 
                          evaluationCriteria: "`getServerSideProps` allows for server-side rendering (SSR) of pages, fetching data at request time instead of build time."
                        },
                        { 
                          question: "What is the `useRouter` hook in Next.js?", 
                          evaluationCriteria: "`useRouter` is a hook provided by Next.js to programmatically handle routing and access routing information, like `query` parameters."
                        },
                        { 
                          question: "What is the role of the `public` folder in Next.js?", 
                          evaluationCriteria: "The `public` folder is where static assets like images, styles, and fonts are placed, which can be accessed directly via URL."
                        }
                      ],
                      Mid: [
                        { 
                          question: "What are the differences between `getStaticProps` and `getServerSideProps` in Next.js?", 
                          evaluationCriteria: "`getStaticProps` is used for static site generation at build time, while `getServerSideProps` fetches data on each request for server-side rendering."
                        },
                        { 
                          question: "How do you use `getInitialProps` in Next.js?", 
                          evaluationCriteria: "`getInitialProps` is an older method for fetching data in Next.js, used before `getStaticProps` and `getServerSideProps` were introduced."
                        },
                        { 
                          question: "How does Next.js support API routes?", 
                          evaluationCriteria: "Next.js allows you to define API routes within the `pages/api` directory, where each file represents an endpoint."
                        },
                        { 
                          question: "What is the difference between `SSR` (server-side rendering) and `SSG` (static site generation) in Next.js?", 
                          evaluationCriteria: "SSR generates HTML on each request, whereas SSG generates HTML at build time for static content."
                        },
                        { 
                          question: "How can you implement lazy loading in Next.js?", 
                          evaluationCriteria: "Lazy loading can be implemented using `next/dynamic`, which allows for components to be loaded asynchronously when needed."
                        },
                        { 
                          question: "What are `middleware` in Next.js?", 
                          evaluationCriteria: "Middleware in Next.js is used to run code before a request is completed. It can modify requests and responses, and handle routing."
                        },
                        { 
                          question: "How does Next.js handle static assets?", 
                          evaluationCriteria: "Next.js serves static assets from the `public` directory, which is mapped to the root URL."
                        },
                        { 
                          question: "How do you implement dynamic imports in Next.js?", 
                          evaluationCriteria: "`next/dynamic` can be used to dynamically import components, improving performance by splitting code and only loading components when necessary."
                        },
                        { 
                          question: "What is the `Image` component in Next.js?", 
                          evaluationCriteria: "The `Image` component in Next.js optimizes images by serving them in modern formats and automatically adjusting sizes based on the viewport."
                        },
                        { 
                          question: "How can you configure custom server in Next.js?", 
                          evaluationCriteria: "Custom servers can be implemented using Express, Koa, or any other Node.js server by creating a custom server file, although Next.js recommends using the default server."
                        }
                      ],
                      Senior: [
                        { 
                          question: "How do you handle incremental static regeneration (ISR) in Next.js?", 
                          evaluationCriteria: "ISR allows pages to be regenerated after being built and deployed by using `revalidate` in `getStaticProps` to define a time interval for regeneration."
                        },
                        { 
                          question: "What is the role of `next.config.js` in Next.js?", 
                          evaluationCriteria: "`next.config.js` is used to configure settings for Next.js, such as redirects, rewrites, and custom Webpack configurations."
                        },
                        { 
                          question: "How do you implement server-side caching in Next.js?", 
                          evaluationCriteria: "Server-side caching can be implemented with caching libraries like `Redis` or by using HTTP cache headers to improve performance."
                        },
                        { 
                          question: "How do you manage environment variables in Next.js?", 
                          evaluationCriteria: "Environment variables in Next.js can be managed using `.env.local`, `.env.production`, and `.env.development` files for different environments."
                        },
                        { 
                          question: "What is the role of `static` and `public` folders in Next.js?", 
                          evaluationCriteria: "The `static` folder was deprecated in Next.js 9. It is recommended to use the `public` folder for static assets."
                        },
                        { 
                          question: "How can you configure custom error pages in Next.js?", 
                          evaluationCriteria: "Custom error pages can be created by adding a `pages/_error.js` or `pages/404.js` file to handle error and not found routes."
                        },
                        { 
                          question: "How do you optimize large applications in Next.js?", 
                          evaluationCriteria: "Optimizations can include code splitting, lazy loading, image optimization, using `next/dynamic`, and reducing unnecessary re-renders."
                        },
                        { 
                          question: "How do you handle multi-language support in Next.js?", 
                          evaluationCriteria: "Multi-language support can be implemented using `next-i18next` or other localization libraries to handle different locales."
                        },
                        { 
                          question: "What is the `useEffect` hook and how does it work in Next.js?", 
                          evaluationCriteria: "`useEffect` is used to perform side effects in function components, such as fetching data or interacting with the DOM."
                        },
                        { 
                          question: "How do you implement authentication and authorization in Next.js?", 
                          evaluationCriteria: "Authentication and authorization can be implemented using Next.js API routes, `JWT`, `OAuth`, or third-party authentication services like Auth0."
                        }
                      ]
                    }
          
          
    },

    backend : {
        node: {
          Junior: [
            { question: "What is Node.js?", evaluationCriteria: "Understands the basics of Node.js and its non-blocking nature." },
            { question: "What is NPM?", evaluationCriteria: "Node Package Manager for managing packages and dependencies." },
            { question: "What is `require` in Node.js?", evaluationCriteria: "Module system in Node.js to include libraries." },
            { question: "What are callbacks in Node.js?", evaluationCriteria: "Callback functions used for asynchronous tasks." },
            { question: "What is the Event Loop?", evaluationCriteria: "Explains how Node.js handles async operations." },
            { question: "What is Express.js?", evaluationCriteria: "Node.js framework for building web applications." },
            { question: "What are modules in Node.js?", evaluationCriteria: "Understanding how Node.js modules work and can be imported." },
            { question: "What is the difference between `fs.readFile` and `fs.readFileSync`?", evaluationCriteria: "Explains asynchronous vs synchronous file reading." },
            { question: "How do you handle errors in Node.js?", evaluationCriteria: "Using try-catch or handling errors in callback functions." },
            { question: "What is middleware in Express?", evaluationCriteria: "Intermediary functions to modify request and response objects." }
          ],
          Mid: [
            { question: "What is middleware in Express?", evaluationCriteria: "Using middleware for handling authentication, error handling, etc." },
            { question: "What are Promises in Node.js?", evaluationCriteria: "Describes asynchronous operations with Promises." },
            { question: "How do you manage environment variables in Node.js?", evaluationCriteria: "Using `process.env` for managing configurations." },
            { question: "What are streams in Node.js?", evaluationCriteria: "Explains reading and writing streams for efficient data handling." },
            { question: "How do you connect to a MongoDB database in Node.js?", evaluationCriteria: "Using MongoDB's official driver or Mongoose." },
            { question: "What is JWT?", evaluationCriteria: "Explains JSON Web Tokens for stateless authentication." },
            { question: "What is the difference between `app.listen` and `app.set` in Express?", evaluationCriteria: "Describes how `listen` starts the server and `set` configures settings." },
            { question: "What is the role of callback functions in Node.js?", evaluationCriteria: "Handles asynchronous behavior in Node.js." },
            { question: "How do you handle HTTP requests in Express?", evaluationCriteria: "Using app.get, app.post, etc., to handle different HTTP methods." },
            { question: "What is `async/await`?", evaluationCriteria: "Modern syntax for handling asynchronous operations." }
          ],
          Senior: [
            { question: "How do you scale a Node.js application?", evaluationCriteria: "Using clustering, load balancing, and horizontal scaling." },
            { question: "What is event-driven programming?", evaluationCriteria: "Handling events asynchronously for high-performance applications." },
            { question: "How do you optimize the performance of Node.js applications?", evaluationCriteria: "Techniques like caching, clustering, load balancing." },
            { question: "How does Node.js handle concurrency?", evaluationCriteria: "Using the event loop to manage non-blocking I/O operations." },
            { question: "What is the purpose of `cluster` in Node.js?", evaluationCriteria: "Spawns multiple child processes for better performance." },
            { question: "How do you handle authentication and authorization in a Node.js application?", evaluationCriteria: "Using strategies like JWT, Passport, and OAuth." },
            { question: "How do you perform logging in Node.js?", evaluationCriteria: "Using tools like Winston or Morgan for application logging." },
            { question: "What are WebSockets in Node.js?", evaluationCriteria: "Real-time bi-directional communication in Node.js." },
            { question: "What is a microservices architecture?", evaluationCriteria: "Decomposing a large application into smaller services, each handling a specific task." },
            { question: "What is the `vm` module in Node.js?", evaluationCriteria: "Sandbox environment to execute JavaScript code within a Node.js app." }
          ]
        },
        express: {
          Junior: [
            { question: "What is Express.js?", evaluationCriteria: "Basic web framework for Node.js." },
            { question: "How do you set up a basic Express server?", evaluationCriteria: "Using `express()` to create a server and `app.listen` to start it." },
            { question: "How do you define routes in Express?", evaluationCriteria: "Using `app.get`, `app.post`, etc., to define routes." },
            { question: "What is a middleware in Express?", evaluationCriteria: "Using middleware functions to handle requests before reaching routes." },
            { question: "How do you send JSON responses in Express?", evaluationCriteria: "Using `res.json()` to send JSON responses." },
            { question: "How do you serve static files in Express?", evaluationCriteria: "Using `express.static` to serve static files like images and styles." },
            { question: "What is the difference between `app.use()` and `app.all()`?", evaluationCriteria: "Explains usage in middleware and routing." },
            { question: "How do you handle form data in Express?", evaluationCriteria: "Using `body-parser` middleware." },
            { question: "What is the role of `next()` in middleware?", evaluationCriteria: "Passing control to the next middleware function." },
            { question: "What is the purpose of `res.send()`?", evaluationCriteria: "Sending responses to the client." }
          ],
          Mid: [
            { question: "How do you handle error handling in Express?", evaluationCriteria: "Using `try-catch`, `next()` to propagate errors." },
            { question: "What is the `app.param()` method in Express?", evaluationCriteria: "Preprocessing URL parameters for routes." },
            { question: "What is Express Router?", evaluationCriteria: "Using Router to modularize route handling." },
            { question: "How do you handle different HTTP methods in Express?", evaluationCriteria: "Using `app.get()`, `app.post()`, etc." },
            { question: "How do you implement request validation in Express?", evaluationCriteria: "Using middleware or libraries like `express-validator`." },
            { question: "How do you perform security in Express?", evaluationCriteria: "Using helmet, CORS, and other security practices." },
            { question: "What are cookies and sessions in Express?", evaluationCriteria: "Explains how to handle user authentication and session persistence." },
            { question: "How do you integrate a database with Express?", evaluationCriteria: "Using ORM libraries or drivers to connect to a database." },
            { question: "What is CSRF and how do you protect against it in Express?", evaluationCriteria: "Using tokens to prevent cross-site request forgery attacks." },
            { question: "What are template engines in Express?", evaluationCriteria: "Using engines like EJS, Pug for rendering dynamic HTML." }
          ],
          Senior: [
            { question: "How do you scale Express applications?", evaluationCriteria: "Using clustering, load balancing, horizontal scaling." },
            { question: "What are the best practices for logging in Express?", evaluationCriteria: "Using Winston, Morgan, or similar libraries." },
            { question: "How do you manage configuration in Express?", evaluationCriteria: "Using environment variables and config files." },
            { question: "How do you implement authorization and roles in Express?", evaluationCriteria: "Using middleware, JWT, Passport for role-based access." },
            { question: "How do you deploy Express applications?", evaluationCriteria: "Using PM2, Docker, cloud providers." },
            { question: "How do you monitor an Express app?", evaluationCriteria: "Using tools like New Relic, Prometheus for performance monitoring." },
            { question: "What is rate-limiting in Express?", evaluationCriteria: "Preventing DoS attacks using rate-limiting middleware." },
            { question: "How do you improve the performance of an Express application?", evaluationCriteria: "Optimizing middleware, minimizing response times." },
            { question: "How do you secure sensitive data in Express?", evaluationCriteria: "Encrypting data, using HTTPS, and preventing XSS attacks." },
            { question: "What is OAuth in Express?", evaluationCriteria: "Using OAuth for third-party authentication and authorization." }
          ]
        },
        js: {
            Junior: [
              { question: "What is the difference between let, const, and var?", evaluationCriteria: "Explains scope and immutability differences clearly." },
              { question: "What are JavaScript closures?", evaluationCriteria: "Mentions functions retaining access to outer scope." },
              { question: "What is the difference between == and === in JavaScript?", evaluationCriteria: "Explains type coercion differences." },
              { question: "How do you handle errors in JavaScript?", evaluationCriteria: "Using try-catch blocks and handling promise rejections." },
              { question: "What is a promise in JavaScript?", evaluationCriteria: "Explains how promises handle asynchronous operations." },
              { question: "What are arrow functions in JavaScript?", evaluationCriteria: "Short syntax for functions with lexical scoping of `this`." },
              { question: "What are the primitive types in JavaScript?", evaluationCriteria: "Explains number, string, boolean, undefined, null, symbol." },
              { question: "What is event bubbling in JavaScript?", evaluationCriteria: "Describes the event propagation mechanism." },
              { question: "What are template literals in JavaScript?", evaluationCriteria: "Explains string interpolation using backticks." },
              { question: "What is the purpose of `this` in JavaScript?", evaluationCriteria: "Explains how `this` works in different contexts." }
            ],
            Mid: [
              { question: "What is the event loop in JavaScript?", evaluationCriteria: "Explains the concurrency model and call stack mechanism." },
              { question: "What is the difference between `null` and `undefined`?", evaluationCriteria: "Explains type and usage differences." },
              { question: "What is the DOM?", evaluationCriteria: "Explains the document object model for interacting with HTML and XML." },
              { question: "What is AJAX?", evaluationCriteria: "Describes asynchronous HTTP requests in JavaScript." },
              { question: "What are higher-order functions?", evaluationCriteria: "Functions that accept or return other functions." },
              { question: "How do you handle asynchronous programming in JavaScript?", evaluationCriteria: "Using promises and async/await." },
              { question: "What is a callback function in JavaScript?", evaluationCriteria: "Explains callback functions for asynchronous operations." },
              { question: "What is the difference between `call()` and `apply()` in JavaScript?", evaluationCriteria: "Explains their differences in invoking functions with context." },
              { question: "What is destructuring in JavaScript?", evaluationCriteria: "Extracting values from objects and arrays." },
              { question: "How does JavaScript handle memory management?", evaluationCriteria: "Automatic garbage collection and memory allocation." }
            ],
            Senior: [
              { question: "What are design patterns in JavaScript?", evaluationCriteria: "Common solutions to software design problems like Singleton, Factory." },
              { question: "What is functional programming in JavaScript?", evaluationCriteria: "Emphasizes immutability, first-class functions, and higher-order functions." },
              { question: "What is event sourcing?", evaluationCriteria: "Storing changes as events rather than the current state." },
              { question: "What is WebAssembly?", evaluationCriteria: "Running code compiled from other languages in the browser." },
              { question: "What is the difference between synchronous and asynchronous code?", evaluationCriteria: "Explains blocking vs non-blocking execution." },
              { question: "What are JavaScript modules?", evaluationCriteria: "Using `import` and `export` to modularize code." },
              { question: "What are Web Workers?", evaluationCriteria: "Running JavaScript code in background threads." },
              { question: "What is a closure in JavaScript?", evaluationCriteria: "The ability of a function to remember its lexical scope." },
              { question: "What is a proxy in JavaScript?", evaluationCriteria: "Intercepts and defines custom behavior for object operations." },
              { question: "What is a service worker?", evaluationCriteria: "Allows intercepting network requests for offline-first experiences." }
            ]
          },
          database: {
            Junior: [
              { question: "What is a database?", evaluationCriteria: "A structured collection of data." },
              { question: "What is SQL?", evaluationCriteria: "Structured Query Language, used to interact with relational databases." },
              { question: "What is a primary key?", evaluationCriteria: "Unique identifier for a database record." },
              { question: "What is normalization?", evaluationCriteria: "The process of organizing data to minimize redundancy." },
              { question: "What is a foreign key?", evaluationCriteria: "A reference to a primary key in another table." },
              { question: "What is a JOIN in SQL?", evaluationCriteria: "Combining rows from multiple tables based on a related column." },
              { question: "What are indexes in databases?", evaluationCriteria: "Improving query performance by providing faster data retrieval." },
              { question: "What is the difference between DELETE and TRUNCATE?", evaluationCriteria: "DELETE removes rows one by one, TRUNCATE resets the table." },
              { question: "What is a subquery?", evaluationCriteria: "A query nested inside another query." },
              { question: "What are the different types of relationships in databases?", evaluationCriteria: "One-to-one, one-to-many, many-to-many." }
            ],
            Mid: [
              { question: "What is query optimization?", evaluationCriteria: "Improving the speed and efficiency of queries." },
              { question: "What is denormalization?", evaluationCriteria: "Reducing the complexity of queries by adding redundant data." },
              { question: "What is an ORM?", evaluationCriteria: "Object-Relational Mapping, for interacting with databases using objects." },
              { question: "What are ACID properties?", evaluationCriteria: "Atomicity, Consistency, Isolation, Durability for reliable database transactions." },
              { question: "What is a transaction in databases?", evaluationCriteria: "Group of SQL statements that are executed as a single unit." },
              { question: "What is the difference between SQL and NoSQL?", evaluationCriteria: "SQL is relational, NoSQL is non-relational and more scalable." },
              { question: "What are stored procedures?", evaluationCriteria: "Predefined SQL code that can be reused." },
              { question: "What is indexing?", evaluationCriteria: "Creating indexes to speed up database queries." },
              { question: "What is a view?", evaluationCriteria: "Virtual table based on a query." },
              { question: "What is normalization?", evaluationCriteria: "Process of organizing data to reduce redundancy and improve integrity." }
            ],
            Senior: [
              { question: "What is database sharding?", evaluationCriteria: "Splitting a database into smaller parts to improve scalability." },
              { question: "What is database replication?", evaluationCriteria: "Copying data across multiple servers for redundancy." },
              { question: "What is partitioning?", evaluationCriteria: "Dividing large tables into smaller, more manageable parts." },
              { question: "What is eventual consistency?", evaluationCriteria: "Consistency across distributed databases over time." },
              { question: "What is database clustering?", evaluationCriteria: "Multiple servers working together to provide higher availability." },
              { question: "What is the CAP theorem?", evaluationCriteria: "Consistency, Availability, Partition tolerance in distributed systems." },
              { question: "What is indexing in databases?", evaluationCriteria: "Improves query performance by creating indexes on columns." },
              { question: "What is a materialized view?", evaluationCriteria: "A precomputed view to speed up queries." },
              { question: "What is database partitioning?", evaluationCriteria: "Splitting large datasets for better performance and scalability." },
              { question: "What is a clustered index?", evaluationCriteria: "An index that determines the physical order of rows in a table." }
            ]
          },
            nestjs: {
              Junior: [
                { question: "What is NestJS?", evaluationCriteria: "A framework for building efficient, scalable Node.js applications using TypeScript." },
                { question: "What is a module in NestJS?", evaluationCriteria: "A module is a class annotated with `@Module()` that organizes the code into logical units." },
                { question: "What is a controller in NestJS?", evaluationCriteria: "A controller handles incoming requests and returns responses, using decorators like `@Get()` and `@Post()`." },
                { question: "What is a provider in NestJS?", evaluationCriteria: "A provider is a class responsible for handling business logic and can be injected into other components." },
                { question: "How do you define routes in NestJS?", evaluationCriteria: "Using decorators like `@Get()`, `@Post()`, `@Put()`, etc., inside controller classes." },
                { question: "What is dependency injection in NestJS?", evaluationCriteria: "A design pattern used to achieve Inversion of Control by injecting dependencies into a class rather than the class creating them." },
                { question: "What is the purpose of the `@Injectable()` decorator?", evaluationCriteria: "It marks a class as injectable, meaning it can be managed by NestJS's dependency injection system." },
                { question: "What is a DTO (Data Transfer Object) in NestJS?", evaluationCriteria: "A DTO is an object that defines the structure of data that is transferred between layers of the application." },
                { question: "How do you handle validation in NestJS?", evaluationCriteria: "Using `class-validator` and `class-transformer` to validate incoming data in controllers or services." },
                { question: "What is the purpose of `@Body()`, `@Param()`, `@Query()` decorators in NestJS?", evaluationCriteria: "These decorators are used to access data from the body, parameters, and query string in incoming requests." }
              ],
              Mid: [
                { question: "What is the role of middleware in NestJS?", evaluationCriteria: "Middleware functions in NestJS are used to modify the request before reaching the route handler, like logging, authentication, etc." },
                { question: "How do you handle asynchronous operations in NestJS?", evaluationCriteria: "Using `async/await` and Promises to manage asynchronous operations in controllers and services." },
                { question: "What is the purpose of `@UseGuards()` in NestJS?", evaluationCriteria: "The `@UseGuards()` decorator is used to apply guards for authentication, authorization, or any other route protection." },
                { question: "How do you handle exceptions in NestJS?", evaluationCriteria: "Using `@Catch()` decorator to define custom exceptions, or leveraging built-in exceptions like `HttpException`." },
                { question: "How do you manage authentication in NestJS?", evaluationCriteria: "By using `Passport` with JWT, local strategy, and guards to protect routes." },
                { question: "What is a custom provider in NestJS?", evaluationCriteria: "A custom provider allows you to define specific logic or objects that can be injected into other components using dependency injection." },
                { question: "How do you use `@Query()` and `@Param()` decorators?", evaluationCriteria: "The `@Query()` decorator is used to access query parameters, and `@Param()` is used to access route parameters in the request." },
                { question: "What is a pipe in NestJS?", evaluationCriteria: "A pipe is used for data transformation and validation before it reaches the handler method in controllers." },
                { question: "How do you set up global filters in NestJS?", evaluationCriteria: "By using `app.useGlobalFilters()` to apply exception filters across the whole application." },
                { question: "What is a NestJS service?", evaluationCriteria: "A service is a class that contains the business logic and can be injected into controllers or other services to share logic." }
              ],
              Senior: [
                { question: "How do you scale a NestJS application?", evaluationCriteria: "By utilizing features like microservices, clustering, horizontal scaling, and load balancing." },
                { question: "What is the difference between a module and a service in NestJS?", evaluationCriteria: "Modules are used to organize and group related code, while services are used to contain the application’s business logic." },
                { question: "How do you implement caching in NestJS?", evaluationCriteria: "Using `@Cacheable()` decorator, `cache-manager`, or integrating with Redis to cache responses or data." },
                { question: "What is a microservice in NestJS?", evaluationCriteria: "A microservice is an independent, self-contained service with its own logic, which can communicate with other microservices via messaging protocols." },
                { question: "How does NestJS handle database transactions?", evaluationCriteria: "Using the `@Transaction()` decorator and leveraging TypeORM or Sequelize for transactional operations." },
                { question: "How do you manage environment variables in NestJS?", evaluationCriteria: "By using `@nestjs/config` package to manage and load environment-specific configurations." },
                { question: "How would you implement logging in NestJS?", evaluationCriteria: "Using `@nestjs/common`’s built-in `Logger` or integrating with external logging tools like Winston or Pino." },
                { question: "How do you manage authorization and roles in NestJS?", evaluationCriteria: "By using guards, custom decorators, and JWT to implement role-based access control." },
                { question: "What is the difference between `onModuleInit()` and `onApplicationBootstrap()` lifecycle hooks in NestJS?", evaluationCriteria: "The `onModuleInit()` is called when a module is initialized, while `onApplicationBootstrap()` is called when the entire application is ready." },
                { question: "How do you implement event-driven architecture in NestJS?", evaluationCriteria: "By using the `@EventPattern()` decorator to listen to events in a microservices-based architecture and process them asynchronously." }
              ]
            },
                mongodb: {
                  Junior: [
                    { question: "What is MongoDB?", evaluationCriteria: "It is a NoSQL database that stores data in a JSON-like format called BSON. It is schema-less." },
                    { question: "What are collections and documents in MongoDB?", evaluationCriteria: "Collections are groups of documents, and documents are individual data entries in BSON format." },
                    { question: "How do you create a new database in MongoDB?", evaluationCriteria: "You can use `db.createDatabase()` or simply switch to a database with `use <dbName>`." },
                    { question: "What is the purpose of indexes in MongoDB?", evaluationCriteria: "Indexes are used to improve the performance of queries by providing a faster search mechanism." },
                    { question: "How do you insert a document in MongoDB?", evaluationCriteria: "Using `db.collection.insertOne()` or `db.collection.insertMany()` methods." },
                    { question: "How do you query documents in MongoDB?", evaluationCriteria: "Using `find()` method along with query filters, e.g., `db.collection.find({name: 'John'})`." },
                    { question: "What are the different types of queries you can perform in MongoDB?", evaluationCriteria: "You can perform equality, range, regular expression, and compound queries." },
                    { question: "What is BSON?", evaluationCriteria: "BSON (Binary JSON) is the binary representation of JSON-like documents that MongoDB uses to store data." },
                    { question: "What is the default port for MongoDB?", evaluationCriteria: "The default port for MongoDB is `27017`." },
                    { question: "How do you delete a document in MongoDB?", evaluationCriteria: "Using `deleteOne()` or `deleteMany()` methods." }
                  ],
                  Mid: [
                    { question: "What is the difference between `updateOne()` and `updateMany()` in MongoDB?", evaluationCriteria: "`updateOne()` updates a single document, while `updateMany()` updates all documents that match the filter." },
                    { question: "What is aggregation in MongoDB?", evaluationCriteria: "Aggregation is the process of transforming data and performing calculations (e.g., sum, group, filter) using stages like `$match`, `$group`, `$project`." },
                    { question: "How do you handle relationships between collections in MongoDB?", evaluationCriteria: "By embedding documents (denormalization) or using references (normalization) with the `$lookup` stage in aggregation." },
                    { question: "What is the purpose of the `ObjectId` in MongoDB?", evaluationCriteria: "The `ObjectId` is a unique identifier automatically assigned to each document when it is created." },
                    { question: "What is a capped collection in MongoDB?", evaluationCriteria: "A capped collection is a fixed-size collection where documents are automatically removed when the collection exceeds its size limit." },
                    { question: "What is the purpose of the `db.collection.createIndex()` method?", evaluationCriteria: "It creates indexes on fields to improve query performance." },
                    { question: "How do you perform a text search in MongoDB?", evaluationCriteria: "By creating a text index on a field and using the `$text` operator in queries." },
                    { question: "What is sharding in MongoDB?", evaluationCriteria: "Sharding is a method for distributing data across multiple machines to horizontally scale a database." },
                    { question: "What are replica sets in MongoDB?", evaluationCriteria: "Replica sets are groups of MongoDB servers that maintain the same data set, providing redundancy and high availability." },
                    { question: "How do you handle data validation in MongoDB?", evaluationCriteria: "You can use the `schema` validation feature, or implement validation rules in the application layer." }
                  ],
                  Senior: [
                    { question: "How do you handle database migrations in MongoDB?", evaluationCriteria: "By using tools like `migrate-mongo`, or manually applying migration scripts using MongoDB's shell or a Node.js driver." },
                    { question: "What is the difference between a primary replica and a secondary replica in MongoDB?", evaluationCriteria: "The primary replica handles all writes, while the secondary replica copies data from the primary to ensure high availability." },
                    { question: "What is the purpose of `Write Concern` in MongoDB?", evaluationCriteria: "Write concern defines the level of acknowledgment requested from MongoDB for write operations." },
                    { question: "What is the purpose of `Read Concern` in MongoDB?", evaluationCriteria: "Read concern controls the consistency and isolation of data read from a replica set or sharded cluster." },
                    { question: "How do you optimize large aggregation queries in MongoDB?", evaluationCriteria: "By using indexes, reducing the number of stages, using `$project` to reduce the output size, and utilizing `$match` early in the pipeline." },
                    { question: "What is the difference between `find()` and `aggregate()` in MongoDB?", evaluationCriteria: "`find()` is used for simple queries, while `aggregate()` is used for more complex operations like grouping, sorting, and transformations." },
                    { question: "How would you improve performance in a MongoDB application?", evaluationCriteria: "By using indexing, query optimization, proper schema design, caching, and sharding large datasets." },
                    { question: "How do you secure a MongoDB instance?", evaluationCriteria: "By enabling authentication, setting up roles and permissions, using SSL/TLS, and enabling firewalls." },
                    { question: "What is a MongoDB change stream?", evaluationCriteria: "Change streams allow applications to listen for changes to data in MongoDB in real-time." },
                    { question: "How do you handle large data sets in MongoDB?", evaluationCriteria: "By using sharding, indexing, pagination, and splitting data across multiple collections or databases." }
                  ]
                },
                
                    mysql: {
                      Junior: [
                        { question: "What is SQL?", evaluationCriteria: "SQL (Structured Query Language) is used to interact with relational databases to manage and manipulate data." },
                        { question: "What is the difference between `DELETE` and `TRUNCATE`?", evaluationCriteria: "`DELETE` removes rows but can be rolled back, while `TRUNCATE` is faster, removing rows but cannot be rolled back." },
                        { question: "What is a primary key in SQL?", evaluationCriteria: "A primary key uniquely identifies each record in a table and cannot have NULL values." },
                        { question: "What is a foreign key in SQL?", evaluationCriteria: "A foreign key is a column that creates a relationship between two tables, linking the primary key of one table to the foreign key in another." },
                        { question: "What is the purpose of the `JOIN` clause in SQL?", evaluationCriteria: "The `JOIN` clause is used to combine rows from two or more tables based on a related column, typically the primary and foreign key." },
                        { question: "What is a `SELECT` statement?", evaluationCriteria: "The `SELECT` statement is used to query data from one or more tables, allowing retrieval of specific columns or all columns." },
                        { question: "What is the difference between `INNER JOIN` and `LEFT JOIN`?", evaluationCriteria: "`INNER JOIN` returns only matching rows from both tables, while `LEFT JOIN` returns all rows from the left table, along with matching rows from the right table." },
                        { question: "How do you filter results in SQL?", evaluationCriteria: "Results are filtered using the `WHERE` clause, which specifies conditions that must be met for records to be selected." },
                        { question: "What is the purpose of the `GROUP BY` clause?", evaluationCriteria: "The `GROUP BY` clause groups rows that have the same values in specified columns, often used with aggregate functions like `COUNT`, `AVG`, `SUM`." },
                        { question: "What is the difference between `HAVING` and `WHERE`?", evaluationCriteria: "`WHERE` filters records before grouping, while `HAVING` filters records after grouping when used with aggregate functions." }
                      ],
                      Mid: [
                        { question: "What is an index in SQL?", evaluationCriteria: "An index improves the speed of data retrieval operations on a table at the cost of additional space and slower write operations." },
                        { question: "What is a subquery in SQL?", evaluationCriteria: "A subquery is a query nested within another query, used to perform operations that require more than one query result." },
                        { question: "What is the difference between `UNION` and `UNION ALL`?", evaluationCriteria: "`UNION` removes duplicate records, while `UNION ALL` includes all records, including duplicates." },
                        { question: "What is normalization in SQL?", evaluationCriteria: "Normalization is the process of organizing data in a database to reduce redundancy and dependency, typically through various normal forms (1NF, 2NF, etc.)." },
                        { question: "What is denormalization?", evaluationCriteria: "Denormalization is the process of combining tables to reduce the complexity of queries and improve performance, though it may increase redundancy." },
                        { question: "What is an `AUTO_INCREMENT` column?", evaluationCriteria: "An `AUTO_INCREMENT` column automatically generates a unique value when a new record is inserted, commonly used for primary keys." },
                        { question: "What is a `VIEW` in SQL?", evaluationCriteria: "A `VIEW` is a virtual table based on the result of a `SELECT` query. It simplifies complex queries and provides a layer of abstraction." },
                        { question: "What is a stored procedure?", evaluationCriteria: "A stored procedure is a set of SQL statements stored in the database and executed as a single unit, often used to encapsulate business logic." },
                        { question: "How do you create an index in SQL?", evaluationCriteria: "By using the `CREATE INDEX` statement, e.g., `CREATE INDEX index_name ON table_name (column_name);`." },
                        { question: "What is the difference between `TRUNCATE` and `DROP`?", evaluationCriteria: "`TRUNCATE` removes all rows from a table but keeps the table structure, while `DROP` removes both the rows and the table structure." }
                      ],
                      Senior: [
                        { question: "What is database partitioning?", evaluationCriteria: "Database partitioning is the process of splitting a large database into smaller, more manageable pieces, improving performance and scalability." },
                        { question: "What is a `CTE` (Common Table Expression)?", evaluationCriteria: "A CTE is a temporary result set defined within the execution scope of a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement." },
                        { question: "What is the difference between `RDBMS` and `NoSQL` databases?", evaluationCriteria: "RDBMS (Relational Database Management Systems) are structured and use SQL, while NoSQL databases are flexible, schema-less, and handle unstructured data." },
                        { question: "How would you optimize a slow SQL query?", evaluationCriteria: "By analyzing execution plans, adding appropriate indexes, reducing the number of joins, optimizing subqueries, and avoiding SELECT *." },
                        { question: "What is ACID compliance?", evaluationCriteria: "ACID stands for Atomicity, Consistency, Isolation, and Durability, which are the key properties ensuring reliable transactions in relational databases." },
                        { question: "What is the difference between a clustered and non-clustered index?", evaluationCriteria: "A clustered index defines the physical order of data, while a non-clustered index creates a separate structure that points to the data." },
                        { question: "What are transactions in SQL?", evaluationCriteria: "Transactions allow a group of SQL operations to be executed as a single unit of work, ensuring data integrity through `COMMIT` and `ROLLBACK`." },
                        { question: "What is a deadlock in SQL?", evaluationCriteria: "A deadlock occurs when two or more transactions prevent each other from completing by holding locks on resources that the other transactions need." },
                        { question: "What is the difference between `INNER JOIN` and `OUTER JOIN`?", evaluationCriteria: "`INNER JOIN` returns only rows with matching records, while `OUTER JOIN` includes unmatched rows as well, with `LEFT`, `RIGHT`, or `FULL` variations." },
                        { question: "How do you perform data migration between two databases?", evaluationCriteria: "By using tools like `ETL` (Extract, Transform, Load), `mysqldump` for MySQL, or custom scripts to migrate data between two database systems." }
                      ]
                    },

                  
                        postgresql: {
                          Junior: [
                            { question: "What is PostgreSQL?", evaluationCriteria: "PostgreSQL is an open-source, object-relational database system that uses and extends the SQL language." },
                            { question: "What is the difference between `VARCHAR` and `TEXT` in PostgreSQL?", evaluationCriteria: "`VARCHAR` has a length constraint while `TEXT` does not. Both are used to store variable-length strings." },
                            { question: "What is the purpose of the `PRIMARY KEY` constraint in PostgreSQL?", evaluationCriteria: "The `PRIMARY KEY` ensures that a column (or set of columns) uniquely identifies each row in a table." },
                            { question: "What are indexes in PostgreSQL?", evaluationCriteria: "Indexes are used to speed up the retrieval of rows from a table by providing quick access to data." },
                            { question: "What is a `FOREIGN KEY` in PostgreSQL?", evaluationCriteria: "A foreign key is a constraint that establishes a link between columns in two tables, ensuring referential integrity." },
                            { question: "What are `serial` and `bigserial` in PostgreSQL?", evaluationCriteria: "`serial` is used for auto-incrementing integer values, while `bigserial` is for larger integer values." },
                            { question: "What is the difference between `DELETE` and `TRUNCATE` in PostgreSQL?", evaluationCriteria: "`DELETE` removes rows and can be rolled back, while `TRUNCATE` removes all rows and cannot be rolled back." },
                            { question: "What is the `DISTINCT` keyword in PostgreSQL?", evaluationCriteria: "`DISTINCT` removes duplicate rows from the result set of a query." },
                            { question: "How do you limit the number of rows returned in a query?", evaluationCriteria: "You can use the `LIMIT` clause to restrict the number of rows returned by a query." },
                            { question: "What is a `JOIN` in PostgreSQL?", evaluationCriteria: "A `JOIN` combines columns from two or more tables based on a related column between them, such as primary and foreign keys." }
                          ],
                          Mid: [
                            { question: "What is the `EXPLAIN` statement in PostgreSQL?", evaluationCriteria: "`EXPLAIN` shows the execution plan of a query, helping to analyze and optimize its performance." },
                            { question: "What are `CTEs` (Common Table Expressions) in PostgreSQL?", evaluationCriteria: "A `CTE` is a temporary result set that can be referenced within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` query." },
                            { question: "How do you perform database normalization in PostgreSQL?", evaluationCriteria: "Normalization is the process of organizing tables to eliminate redundancy and ensure data integrity through normalization forms (1NF, 2NF, 3NF)." },
                            { question: "What is the `VACUUM` command in PostgreSQL?", evaluationCriteria: "`VACUUM` reclaims storage by cleaning up outdated data and maintaining the health of the database." },
                            { question: "What is a `trigger` in PostgreSQL?", evaluationCriteria: "A trigger is a function that is automatically executed when certain events occur on a table, such as `INSERT`, `UPDATE`, or `DELETE`." },
                            { question: "What is the `ARRAY` data type in PostgreSQL?", evaluationCriteria: "`ARRAY` allows storage of multiple values of the same type in a single column." },
                            { question: "What is the difference between `UNION` and `UNION ALL` in PostgreSQL?", evaluationCriteria: "`UNION` removes duplicates, while `UNION ALL` includes all records, even duplicates." },
                            { question: "What is the `WITH` clause in PostgreSQL?", evaluationCriteria: "`WITH` is used to define temporary result sets that can be referenced within a `SELECT` query, improving readability and modularity." },
                            { question: "How do you perform a full-text search in PostgreSQL?", evaluationCriteria: "PostgreSQL has built-in support for full-text search using `tsvector` and `tsquery` types." },
                            { question: "What is the `PARTITION BY` clause in PostgreSQL?", evaluationCriteria: "`PARTITION BY` divides the result set into partitions to apply window functions to each partition separately." }
                          ],
                          Senior: [
                            { question: "What are the different types of indexes in PostgreSQL?", evaluationCriteria: "PostgreSQL supports various types of indexes such as B-tree, hash, GIN, GiST, and BRIN indexes for different use cases." },
                            { question: "What are `foreign tables` in PostgreSQL?", evaluationCriteria: "`Foreign tables` allow you to query data from external data sources like other PostgreSQL servers or non-PostgreSQL systems." },
                            { question: "What is replication in PostgreSQL?", evaluationCriteria: "Replication is the process of copying and synchronizing data from one database (master) to one or more others (slaves), ensuring high availability." },
                            { question: "How would you design a scalable, fault-tolerant PostgreSQL system?", evaluationCriteria: "Design considerations include replication (both synchronous and asynchronous), load balancing, partitioning, and using tools like `PgBouncer` for connection pooling." },
                            { question: "What is the `row-level security` feature in PostgreSQL?", evaluationCriteria: "`Row-level security` restricts which rows are visible to a user based on policies applied to tables." },
                            { question: "How would you implement sharding in PostgreSQL?", evaluationCriteria: "Sharding involves partitioning data across multiple database servers. You can implement sharding manually or use extensions like `Citus`." },
                            { question: "What is `parallel query execution` in PostgreSQL?", evaluationCriteria: "Parallel query execution allows PostgreSQL to divide a query into multiple parts and execute them concurrently, improving performance for complex queries." },
                            { question: "What is `logical replication` in PostgreSQL?", evaluationCriteria: "Logical replication allows for replication of specific tables or databases, enabling more granular replication strategies compared to physical replication." },
                            { question: "What is `plpgsql` in PostgreSQL?", evaluationCriteria: "`PL/pgSQL` is a procedural language used for writing stored procedures and functions in PostgreSQL." },
                            { question: "How do you handle schema migrations in PostgreSQL?", evaluationCriteria: "Schema migrations can be handled using tools like `Flyway` or `Liquibase`, or manually using `ALTER TABLE` and other DDL commands." }
                          ]
                        },

                            python: {
                              Junior: [
                                { 
                                  question: "What is the difference between `list` and `tuple` in Python?", 
                                  evaluationCriteria: "A `list` is mutable (can be modified), while a `tuple` is immutable."
                                },
                                { 
                                  question: "What are Python decorators?", 
                                  evaluationCriteria: "Decorators are functions that modify the behavior of another function or class method."
                                },
                                { 
                                  question: "Explain the concept of list comprehension in Python.", 
                                  evaluationCriteria: "List comprehension is a compact way of creating lists using a single line of code."
                                },
                                { 
                                  question: "What is the purpose of `self` in Python classes?", 
                                  evaluationCriteria: "`self` represents the instance of the class and is used to access instance variables and methods."
                                },
                                { 
                                  question: "What is the difference between `deepcopy()` and `copy()` in Python?", 
                                  evaluationCriteria: "`copy()` creates a shallow copy, while `deepcopy()` creates a complete copy of an object, including nested objects."
                                },
                                { 
                                  question: "How do you handle exceptions in Python?", 
                                  evaluationCriteria: "Exceptions are handled using `try`, `except` blocks. Optionally, you can use `else` and `finally`."
                                },
                                { 
                                  question: "What is the purpose of `with` statement in Python?", 
                                  evaluationCriteria: "The `with` statement is used for resource management, ensuring that resources are cleaned up after use (e.g., closing files)."
                                },
                                { 
                                  question: "What are Python's built-in data types?", 
                                  evaluationCriteria: "Python's built-in data types include `int`, `float`, `str`, `list`, `tuple`, `dict`, `set`, `bool`, and `None`."
                                },
                                { 
                                  question: "What is the `pass` keyword in Python?", 
                                  evaluationCriteria: "`pass` is a placeholder used when a statement is syntactically required but no action is needed."
                                },
                                { 
                                  question: "How do you write a function in Python?", 
                                  evaluationCriteria: "A function is defined using the `def` keyword followed by the function name and parameters (if any)."
                                }
                              ],
                              Mid: [
                                { 
                                  question: "What are Python generators and how do they work?", 
                                  evaluationCriteria: "Generators are functions that return an iterator, using the `yield` keyword. They allow for lazy evaluation, producing values one at a time."
                                },
                                { 
                                  question: "What is the difference between `@staticmethod` and `@classmethod` in Python?", 
                                  evaluationCriteria: "`@staticmethod` defines a method that doesn't operate on instance data, while `@classmethod` operates on the class itself."
                                },
                                { 
                                  question: "What is a lambda function in Python?", 
                                  evaluationCriteria: "A lambda function is an anonymous function defined using the `lambda` keyword, typically used for short, throwaway functions."
                                },
                                { 
                                  question: "Explain how Python handles memory management.", 
                                  evaluationCriteria: "Python uses automatic memory management with reference counting and a garbage collector for unreferenced objects."
                                },
                                { 
                                  question: "What are `args` and `kwargs` in Python?", 
                                  evaluationCriteria: "`*args` allows passing a variable number of positional arguments, and `**kwargs` allows passing a variable number of keyword arguments."
                                },
                                { 
                                  question: "What is the Global Interpreter Lock (GIL) in Python?", 
                                  evaluationCriteria: "The GIL is a mutex in Python that prevents multiple threads from executing Python bytecodes at once, ensuring thread safety but limiting concurrency."
                                },
                                { 
                                  question: "What are Python's built-in modules for working with data?", 
                                  evaluationCriteria: "Python has several built-in modules for data manipulation such as `os`, `sys`, `re`, `json`, `csv`, `math`, and `datetime`."
                                },
                                { 
                                  question: "What is the difference between `__str__` and `__repr__` in Python?", 
                                  evaluationCriteria: "`__str__` is used for user-friendly string representation, while `__repr__` is used for a detailed, unambiguous string representation."
                                },
                                { 
                                  question: "How do you handle multithreading in Python?", 
                                  evaluationCriteria: "Multithreading in Python can be done using the `threading` module, but is often limited due to the GIL. Multiprocessing may be preferred for CPU-bound tasks."
                                },
                                { 
                                  question: "What is the difference between `is` and `==` in Python?", 
                                  evaluationCriteria: "`is` checks for object identity (if two objects are the same in memory), while `==` checks for equality of values."
                                }
                              ],
                              Senior: [
                                { 
                                  question: "How do you handle memory leaks in Python?", 
                                  evaluationCriteria: "Memory leaks can be avoided by managing object references, using weak references, and utilizing Python's garbage collection."
                                },
                                { 
                                  question: "What are Python metaclasses?", 
                                  evaluationCriteria: "Metaclasses define the behavior of classes themselves. They control the creation and customization of class objects."
                                },
                                { 
                                  question: "What is the purpose of `__init__` and `__new__` in Python?", 
                                  evaluationCriteria: "`__init__` is used to initialize a new instance, while `__new__` is responsible for creating a new instance of a class."
                                },
                                { 
                                  question: "Explain how you would optimize a Python application for performance.", 
                                  evaluationCriteria: "Optimizations can include profiling, reducing object allocations, using C extensions (like `Cython`), or using optimized data structures."
                                },
                                { 
                                  question: "What are Python's built-in concurrency modules and how do they differ?", 
                                  evaluationCriteria: "Python offers `threading`, `multiprocessing`, and `asyncio`. `threading` is for IO-bound tasks, `multiprocessing` for CPU-bound tasks, and `asyncio` for async IO operations."
                                },
                                { 
                                  question: "What is the role of `__del__` method in Python?", 
                                  evaluationCriteria: "`__del__` is the destructor method called when an object is about to be destroyed, but it is not recommended for use due to its unpredictable execution."
                                },
                                { 
                                  question: "How does Python's `asyncio` library work?", 
                                  evaluationCriteria: "`asyncio` enables asynchronous programming by using `async` and `await` to define asynchronous functions and coroutines."
                                },
                                { 
                                  question: "What is the difference between `Python 2.x` and `Python 3.x`?", 
                                  evaluationCriteria: "Python 3 introduces improvements such as better Unicode handling, new syntax (`print()` function), and other changes that make it more efficient and consistent."
                                },
                                { 
                                  question: "How do you optimize Python's performance for CPU-bound tasks?", 
                                  evaluationCriteria: "For CPU-bound tasks, multiprocessing can be used, or tasks can be offloaded to C/C++ extensions, or optimized algorithms can be employed."
                                },
                                { 
                                  question: "What is the difference between `deepcopy` and `copy` in Python?", 
                                  evaluationCriteria: "`copy()` creates a shallow copy, while `deepcopy()` creates a new object and recursively copies all nested objects."
                                }
                              ]
                            },
                                django: {
                                  Junior: [
                                    { 
                                      question: "What is Django and what are its key features?", 
                                      evaluationCriteria: "Django is a high-level Python web framework that encourages rapid development. Key features include ORM, authentication, templating, and routing."
                                    },
                                    { 
                                      question: "How does Django handle URL routing?", 
                                      evaluationCriteria: "Django uses a URLconf (URL configuration) to map URL patterns to views. It's configured using a Python file that contains URL patterns."
                                    },
                                    { 
                                      question: "What are Django views and templates?", 
                                      evaluationCriteria: "Views handle logic and return a response. Templates are HTML files that are rendered and populated with dynamic data."
                                    },
                                    { 
                                      question: "What is Django ORM and why is it useful?", 
                                      evaluationCriteria: "Django ORM allows you to interact with the database using Python objects instead of SQL queries. It simplifies database interaction and helps prevent SQL injection."
                                    },
                                    { 
                                      question: "How do you create a model in Django?", 
                                      evaluationCriteria: "A model is created by defining a Python class that subclasses `django.db.models.Model` and defining fields as class attributes."
                                    },
                                    { 
                                      question: "How do you perform database migrations in Django?", 
                                      evaluationCriteria: "Migrations are performed using `python manage.py makemigrations` to create migration files and `python manage.py migrate` to apply them."
                                    },
                                    { 
                                      question: "What is the purpose of the `settings.py` file in Django?", 
                                      evaluationCriteria: "`settings.py` holds configurations for the Django project, such as database settings, middleware, installed apps, and other project-wide settings."
                                    },
                                    { 
                                      question: "What is the difference between `GET` and `POST` requests in Django?", 
                                      evaluationCriteria: "`GET` requests are used for retrieving data, while `POST` requests are used for submitting data, typically through forms."
                                    },
                                    { 
                                      question: "What are Django middleware and why are they used?", 
                                      evaluationCriteria: "Middleware are hooks that process requests and responses globally before they reach the view or after the view has processed the response."
                                    },
                                    { 
                                      question: "What are Django admin and how do you use it?", 
                                      evaluationCriteria: "Django admin is a built-in feature that provides a user-friendly interface for managing database records."
                                    }
                                  ],
                                  Mid: [
                                    { 
                                      question: "What is Django's request-response cycle?", 
                                      evaluationCriteria: "The request-response cycle includes receiving the request, URL resolution, view execution, template rendering, and sending the response."
                                    },
                                    { 
                                      question: "What are Django class-based views (CBVs)?", 
                                      evaluationCriteria: "CBVs allow for the organization of views into reusable components such as `ListView`, `DetailView`, etc., to handle HTTP methods in an object-oriented manner."
                                    },
                                    { 
                                      question: "How do you implement authentication and authorization in Django?", 
                                      evaluationCriteria: "Authentication in Django is managed using `django.contrib.auth` while authorization is handled via permissions and groups. Custom authentication views can be created as well."
                                    },
                                    { 
                                      question: "What are Django signals and how are they used?", 
                                      evaluationCriteria: "Django signals allow decoupled applications to get notified when certain events occur. Examples include `pre_save`, `post_save`, and `pre_delete`."
                                    },
                                    { 
                                      question: "What is Django Rest Framework (DRF) and what is its purpose?", 
                                      evaluationCriteria: "DRF is a powerful toolkit for building Web APIs. It simplifies building RESTful APIs in Django by providing serializers, views, and routers."
                                    },
                                    { 
                                      question: "What are Django forms and how do they work?", 
                                      evaluationCriteria: "Django forms handle form creation and validation. Forms are created by subclassing `django.forms.Form` or `django.forms.ModelForm` for model-backed forms."
                                    },
                                    { 
                                      question: "How do you handle file uploads in Django?", 
                                      evaluationCriteria: "File uploads are handled by using `FileField` or `ImageField` in models, and `request.FILES` for accessing uploaded files."
                                    },
                                    { 
                                      question: "What is the purpose of the `context` in Django templates?", 
                                      evaluationCriteria: "`context` is a dictionary containing data that is passed from views to templates to render dynamic content."
                                    },
                                    { 
                                      question: "How do you implement caching in Django?", 
                                      evaluationCriteria: "Django provides several caching mechanisms like file-based, database, and in-memory caching. You can configure caching via `settings.py` or use `cache.set()`."
                                    },
                                    { 
                                      question: "What is the difference between `select_related` and `prefetch_related` in Django ORM?", 
                                      evaluationCriteria: "`select_related` is used for foreign key and one-to-one relationships and performs a SQL join. `prefetch_related` is used for many-to-many and reverse foreign key relationships, executing separate queries."
                                    }
                                  ],
                                  Senior: [
                                    { 
                                      question: "What is Django's middleware stack and how does it work?", 
                                      evaluationCriteria: "The middleware stack processes requests and responses through a series of hooks, such as `process_request()` and `process_response()`, allowing custom processing before and after view handling."
                                    },
                                    { 
                                      question: "How do you implement Django's custom user model?", 
                                      evaluationCriteria: "A custom user model is created by subclassing `AbstractBaseUser` and `BaseUserManager` and overriding methods like `create_user()` and `create_superuser()`."
                                    },
                                    { 
                                      question: "How do you implement multi-tenancy in Django?", 
                                      evaluationCriteria: "Multi-tenancy can be implemented in Django using database partitioning (e.g., separate schemas or databases per tenant), or with a shared database approach using custom domain or subdomain handling."
                                    },
                                    { 
                                      question: "What are Django’s transaction management mechanisms?", 
                                      evaluationCriteria: "Django provides transaction management with `atomic` blocks that ensure database operations are atomic, preventing partial updates in case of errors."
                                    },
                                    { 
                                      question: "What is Django's `signals` and how can they be used for decoupling applications?", 
                                      evaluationCriteria: "Signals allow for decoupled code by notifying other parts of the application when certain actions occur. Common signals include `pre_save`, `post_save`, and `pre_delete`."
                                    },
                                    { 
                                      question: "How do you ensure security in Django applications?", 
                                      evaluationCriteria: "Security in Django includes using HTTPS, preventing SQL injection, using CSRF protection, properly handling sessions, using `Content Security Policy` (CSP), and securing file uploads."
                                    },
                                    { 
                                      question: "How do you handle database migrations in a production environment?", 
                                      evaluationCriteria: "In production, migrations are handled carefully using `python manage.py migrate` with zero downtime and backed-up databases. Some teams use `schema migration` tools for rollback and version control."
                                    },
                                    { 
                                      question: "What is Django's `prefetch_related` and how does it optimize database queries?", 
                                      evaluationCriteria: "`prefetch_related` performs a separate query for related objects and optimizes many-to-many and reverse relationships by reducing the number of queries."
                                    },
                                    { 
                                      question: "What are Django's async features and how do they work?", 
                                      evaluationCriteria: "Django 3.0+ introduces async views, database queries, and middleware. Async views help to handle long-running tasks without blocking other requests."
                                    },
                                    { 
                                      question: "How do you deploy Django applications to production?", 
                                      evaluationCriteria: "Django production deployments typically involve using `gunicorn` or `uwsgi` as WSGI servers, Nginx or Apache as a reverse proxy, setting up a PostgreSQL/MySQL database, and using `supervisord` for process management."
                                    }
                                  ]
                                },

                               
                                    flask: {
                                      Junior: [
                                        {
                                          question: "What is Flask and how does it differ from Django?",
                                          evaluationCriteria: "Flask is a lightweight, micro web framework in Python. Unlike Django, it provides fewer built-in tools and relies more on extensions for additional functionality."
                                        },
                                        {
                                          question: "What are routes in Flask?",
                                          evaluationCriteria: "Routes in Flask are URL patterns that are mapped to functions (views) using the `@app.route()` decorator."
                                        },
                                        {
                                          question: "How do you handle form data in Flask?",
                                          evaluationCriteria: "Form data can be accessed using `request.form` to retrieve POST data and `request.args` for GET query parameters."
                                        },
                                        {
                                          question: "What is the purpose of `Flask`'s `app.run()` method?",
                                          evaluationCriteria: "`app.run()` starts the Flask development server. It's typically used during development but not for production."
                                        },
                                        {
                                          question: "How do you handle static files in Flask?",
                                          evaluationCriteria: "Flask serves static files (like images, CSS, JS) from a folder called `static`. This is automatically handled using `url_for('static', filename='file')`."
                                        },
                                        {
                                          question: "What is `Flask-WTF` and why is it used?",
                                          evaluationCriteria: "`Flask-WTF` is an extension for Flask that simplifies form handling, validation, and CSRF protection in web forms."
                                        },
                                        {
                                          question: "What is the difference between `GET` and `POST` methods in Flask?",
                                          evaluationCriteria: "`GET` is used to retrieve data from the server, while `POST` is used to send data to the server, typically for creating or updating resources."
                                        },
                                        {
                                          question: "What is the `render_template` function in Flask?",
                                          evaluationCriteria: "`render_template` is used to render HTML templates with dynamic data passed from the view function."
                                        },
                                        {
                                          question: "How do you set up a virtual environment in Flask?",
                                          evaluationCriteria: "A virtual environment is set up using `python -m venv env` and activated using `source env/bin/activate` (Unix-based systems) or `env\Scripts\activate` (Windows)."
                                        },
                                        {
                                          question: "How do you structure a basic Flask project?",
                                          evaluationCriteria: "A typical structure includes an `app.py` for the main application logic, a `templates/` directory for HTML files, and a `static/` directory for static assets."
                                        }
                                      ],
                                      Mid: [
                                        {
                                          question: "How do you handle database connections in Flask?",
                                          evaluationCriteria: "Database connections can be handled using Flask extensions like `Flask-SQLAlchemy` for SQL databases or `Flask-PyMongo` for MongoDB."
                                        },
                                        {
                                          question: "What are Flask blueprints and why would you use them?",
                                          evaluationCriteria: "Blueprints allow you to organize your Flask application into reusable components, making the application structure modular and scalable."
                                        },
                                        {
                                          question: "How do you handle sessions in Flask?",
                                          evaluationCriteria: "Flask uses `session` to store data specific to a user session. This is typically stored in cookies, and can be configured for server-side storage."
                                        },
                                        {
                                          question: "What is Flask-SQLAlchemy?",
                                          evaluationCriteria: "`Flask-SQLAlchemy` is an extension for Flask that adds support for SQLAlchemy, a powerful ORM that simplifies database interaction."
                                        },
                                        {
                                          question: "How do you use `Flask-Migrate` for database migrations?",
                                          evaluationCriteria: "`Flask-Migrate` integrates `Alembic` with Flask to handle database migrations. Migrations are created with `flask db migrate` and applied with `flask db upgrade`."
                                        },
                                        {
                                          question: "What is Flask’s `before_request` and `after_request` functions?",
                                          evaluationCriteria: "`before_request` runs before each request and can be used for setting up things like database connections. `after_request` runs after each request, typically used for closing resources."
                                        },
                                        {
                                          question: "What is Flask-JWT and how do you use it?",
                                          evaluationCriteria: "`Flask-JWT` is an extension that allows for easy integration of JSON Web Tokens (JWT) for authentication and authorization."
                                        },
                                        {
                                          question: "How do you create RESTful APIs in Flask?",
                                          evaluationCriteria: "Flask supports RESTful API creation by handling various HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) in different view functions, often used with `Flask-RESTful` for simplicity."
                                        },
                                        {
                                          question: "What are Flask’s `url_for` and `redirect` functions?",
                                          evaluationCriteria: "`url_for` is used to generate URLs dynamically for routes. `redirect` is used to send the user to a different route."
                                        },
                                        {
                                          question: "How do you implement error handling in Flask?",
                                          evaluationCriteria: "Error handling in Flask can be done using the `@app.errorhandler()` decorator to capture and handle specific HTTP errors like 404 or 500."
                                        }
                                      ],
                                      Senior: [
                                        {
                                          question: "How do you scale Flask applications?",
                                          evaluationCriteria: "Flask applications can be scaled using techniques like load balancing, distributed systems (using message queues like Celery), or deploying the app in Docker containers and orchestrating with Kubernetes."
                                        },
                                        {
                                          question: "How do you optimize the performance of a Flask application?",
                                          evaluationCriteria: "Performance can be optimized using caching mechanisms (`Flask-Caching`), optimizing database queries, and using asynchronous processing with `Flask-SocketIO` or `Celery`."
                                        },
                                        {
                                          question: "How do you ensure security in Flask applications?",
                                          evaluationCriteria: "Security best practices in Flask include using HTTPS, proper session management, preventing SQL injection, CSRF protection, password hashing (e.g., with `Flask-Bcrypt`), and using `Flask-Security` for advanced features."
                                        },
                                        {
                                          question: "What is Flask’s application factory pattern?",
                                          evaluationCriteria: "The application factory pattern is used to create a Flask app instance. It helps with setting up multiple configurations and testing, making the app more modular."
                                        },
                                        {
                                          question: "How do you implement background tasks in Flask?",
                                          evaluationCriteria: "Background tasks can be implemented using `Celery`, which works with Flask to manage asynchronous tasks, such as sending emails or processing large files."
                                        },
                                        {
                                          question: "What is Flask’s context management and why is it important?",
                                          evaluationCriteria: "Flask uses contexts (`request`, `session`, `g`, and `app`) to store and pass data during a request lifecycle. Proper context management is important for managing resources and avoiding thread safety issues."
                                        },
                                        {
                                          question: "What are Flask’s test client and unit testing capabilities?",
                                          evaluationCriteria: "Flask’s test client is used to simulate HTTP requests to your app for testing. Unit testing can be done using Python’s `unittest` framework or `pytest`."
                                        },
                                        {
                                          question: "What is Flask’s `gevent` and how does it handle concurrency?",
                                          evaluationCriteria: "`gevent` is a coroutine-based Python networking library that can be used with Flask to handle concurrency by allowing non-blocking network calls."
                                        },
                                        {
                                          question: "How do you implement custom middlewares in Flask?",
                                          evaluationCriteria: "Custom middleware in Flask can be created by subclassing `BaseMiddleware` or by using the `@app.before_request()` and `@app.after_request()` decorators to execute logic before or after requests."
                                        },
                                        {
                                          question: "How do you deploy a Flask application in a production environment?",
                                          evaluationCriteria: "Production deployment typically involves using a WSGI server like `gunicorn` or `uWSGI`, with a reverse proxy like `nginx`, and setting up for production environment variables."
                                        }
                                      ]
                                    },

                                        fastapi: {
                                          Junior: [
                                            {
                                              question: "What is FastAPI, and how is it different from Flask?",
                                              evaluationCriteria: "FastAPI is a modern, fast (high-performance) web framework for building APIs with Python. It's based on standard Python type hints and asynchronous programming, unlike Flask, which is synchronous by default."
                                            },
                                            {
                                              question: "How do you define a route in FastAPI?",
                                              evaluationCriteria: "Routes in FastAPI are defined using the `@app.get()` or `@app.post()` decorators. These are similar to Flask but support automatic validation via type annotations."
                                            },
                                            {
                                              question: "What are path parameters in FastAPI?",
                                              evaluationCriteria: "Path parameters are variables defined in the URL path (e.g., `/items/{item_id}`). These parameters are captured by FastAPI and passed into the associated view function."
                                            },
                                            {
                                              question: "What is a Pydantic model and why is it used in FastAPI?",
                                              evaluationCriteria: "Pydantic models are used for data validation and serialization in FastAPI. They allow you to define and validate the structure of data that FastAPI expects or returns."
                                            },
                                            {
                                              question: "What is the purpose of `Depends` in FastAPI?",
                                              evaluationCriteria: "`Depends` is used for dependency injection in FastAPI. It allows you to declare a dependency for your route functions, enabling modular and reusable code."
                                            },
                                            {
                                              question: "How do you handle query parameters in FastAPI?",
                                              evaluationCriteria: "Query parameters in FastAPI can be defined as function arguments, and FastAPI automatically validates and converts them to the correct types."
                                            },
                                            {
                                              question: "What is the `UVicorn` server, and why is it used with FastAPI?",
                                              evaluationCriteria: "UVicorn is an ASGI (Asynchronous Server Gateway Interface) server used to serve FastAPI applications. It's highly efficient and supports asynchronous execution."
                                            },
                                            {
                                              question: "How do you handle HTTP request and response bodies in FastAPI?",
                                              evaluationCriteria: "You can use Pydantic models to define request bodies and specify the response model in the route handler. FastAPI automatically serializes and validates data."
                                            },
                                            {
                                              question: "How does FastAPI handle data validation?",
                                              evaluationCriteria: "FastAPI uses Pydantic models for data validation. Type hints are used to validate incoming request data, and errors are automatically returned in the response if the validation fails."
                                            },
                                            {
                                              question: "How do you implement static files in FastAPI?",
                                              evaluationCriteria: "FastAPI allows you to serve static files using `app.mount()`, where you specify the path and directory containing static files."
                                            }
                                          ],
                                          Mid: [
                                            {
                                              question: "How do you handle authentication in FastAPI?",
                                              evaluationCriteria: "Authentication in FastAPI can be handled with OAuth2, JWT tokens, or basic authentication. FastAPI has built-in support for these methods using the `Depends` function."
                                            },
                                            {
                                              question: "How do you create a background task in FastAPI?",
                                              evaluationCriteria: "FastAPI provides a `BackgroundTasks` class, which can be used to run tasks in the background, such as sending emails or processing long-running jobs."
                                            },
                                            {
                                              question: "What is the purpose of `FastAPI`'s dependency injection system?",
                                              evaluationCriteria: "FastAPI's dependency injection system allows you to define reusable, modular dependencies that can be injected into route functions automatically."
                                            },
                                            {
                                              question: "How does FastAPI support asynchronous programming?",
                                              evaluationCriteria: "FastAPI fully supports asynchronous programming with Python's `async` and `await` keywords. This allows handling asynchronous tasks, such as database queries, without blocking the main thread."
                                            },
                                            {
                                              question: "What are Pydantic validators in FastAPI, and how do you use them?",
                                              evaluationCriteria: "Pydantic validators are methods that are used to add custom validation logic to models. They can be defined using the `@root_validator` decorator or as class-level methods."
                                            },
                                            {
                                              question: "How do you create custom exceptions in FastAPI?",
                                              evaluationCriteria: "Custom exceptions can be created using the `HTTPException` class, which allows you to specify custom status codes and messages. These exceptions can be raised within route handlers."
                                            },
                                            {
                                              question: "How do you handle CORS in FastAPI?",
                                              evaluationCriteria: "CORS (Cross-Origin Resource Sharing) can be handled in FastAPI using the `CORSMiddleware` from `fastapi.middleware.cors`. This allows you to control which origins are allowed to access your API."
                                            },
                                            {
                                              question: "How does FastAPI generate OpenAPI documentation?",
                                              evaluationCriteria: "FastAPI automatically generates OpenAPI documentation using the route definitions, request and response models, and type annotations. The documentation is available at `/docs` or `/redoc`."
                                            },
                                            {
                                              question: "How do you implement middleware in FastAPI?",
                                              evaluationCriteria: "Middleware in FastAPI can be implemented by subclassing `BaseHTTPMiddleware` or using the `@app.middleware()` decorator. Middleware is useful for adding functionality like logging or modifying requests/responses."
                                            },
                                            {
                                              question: "How do you configure CORS and authentication middleware together in FastAPI?",
                                              evaluationCriteria: "By adding multiple middleware layers in the correct order, you can ensure that both CORS and authentication checks are applied. `CORSMiddleware` would typically be added before the authentication middleware."
                                            }
                                          ],
                                          Senior: [
                                            {
                                              question: "How do you handle rate limiting in FastAPI?",
                                              evaluationCriteria: "Rate limiting can be handled using custom middleware, or using third-party libraries like `fastapi-limiter`, which allows you to limit the number of requests from a client within a time window."
                                            },
                                            {
                                              question: "How do you scale FastAPI applications for production?",
                                              evaluationCriteria: "FastAPI applications can be scaled using ASGI servers like `UVicorn` or `Daphne` and reverse proxies like `Nginx`. FastAPI’s asynchronous capabilities make it suitable for handling large numbers of concurrent requests."
                                            },
                                            {
                                              question: "How do you handle database transactions in FastAPI?",
                                              evaluationCriteria: "FastAPI supports transactional integrity with ORMs like SQLAlchemy, and the `Depends` dependency injection system allows you to manage database sessions and ensure that transactions are committed or rolled back."
                                            },
                                            {
                                              question: "How do you implement versioning for APIs in FastAPI?",
                                              evaluationCriteria: "API versioning can be implemented using route prefixes (e.g., `/v1/`) or by using custom dependencies to handle versioning logic."
                                            },
                                            {
                                              question: "How do you implement background job processing with Celery in FastAPI?",
                                              evaluationCriteria: "FastAPI can integrate with Celery for background job processing by setting up a Celery worker, which can handle long-running tasks asynchronously."
                                            },
                                            {
                                              question: "What is FastAPI’s dependency injection system, and why is it important?",
                                              evaluationCriteria: "FastAPI’s dependency injection system allows for modular, reusable components. It is used to inject objects like database sessions, configuration values, and services into route handlers."
                                            },
                                            {
                                              question: "What are FastAPI’s best practices for exception handling and logging?",
                                              evaluationCriteria: "Exception handling in FastAPI is done using `HTTPException`. For logging, FastAPI integrates well with Python’s built-in `logging` module. Custom exception handlers can be defined to capture specific errors."
                                            },
                                            {
                                              question: "How do you optimize FastAPI performance for high-traffic applications?",
                                              evaluationCriteria: "Optimizing FastAPI involves techniques like using asynchronous routes, caching responses, optimizing database queries, scaling horizontally, and deploying with high-performance ASGI servers like `UVicorn`."
                                            },
                                            {
                                              question: "How do you implement OAuth2 with FastAPI?",
                                              evaluationCriteria: "OAuth2 authentication can be implemented using FastAPI’s OAuth2PasswordBearer class, which provides a standard mechanism for authenticating users via OAuth2 and JWT tokens."
                                            },
                                            {
                                              question: "How do you implement GraphQL in FastAPI?",
                                              evaluationCriteria: "FastAPI supports GraphQL via integrations with libraries like `graphene` and `strawberry`. These libraries allow you to define a GraphQL schema and query resolver functions for handling requests."
                                            }
                                          ]
                                        }
                                      
                                      
                                  
                                  
                              
                              
                          
                          

                      
                      
                  
            
              
          
          
        }
      
      
}

export default questionBank