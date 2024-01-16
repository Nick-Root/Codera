from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_comments():
    pythoncomm = Comment(
        userId = 2, questionId = 1, comment = 'Idk. Google it or something'
    )
    javascriptcomm = Comment(
        userId = 3, questionId = 2, comment = 'Idk. Check StackOverflow'
    )
    expresscomm = Comment(
        userId = 1, questionId = 3, comment = 'Idk. Scower the internet for it'
    )
    comment4 = Comment(
        userId= 4, questionId=1 , comment = 'Great Question'
    )
    comment5 = Comment(
        userId= 5, questionId=2 , comment = 'Let me look into it'
    )
    comment6 = Comment(
        userId= 6, questionId=3 , comment = 'Look at the docs'
    )
    comment7 = Comment(
        userId= 7, questionId=4 , comment = 'You dont want everything always running at the same time'
    )
    comment8 = Comment(
        userId= 8, questionId=5 , comment = 'They are similar to JS arrays and dictionaries, I recommend looking at the the docs for in-depth explainations on each of them'
    )
    comment9 = Comment(
        userId= 1, questionId=6 , comment = ' "dbreset": "npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all"'
    )
    comment10 = Comment(
        userId= 2, questionId=7 , comment = 'Definitely the <div> tag hands down'
    )
    comment11 = Comment(
        userId= 3, questionId=8 , comment = 'Adding a box-shadow property to you elements can really make your page pop!'
    )
    comment12 = Comment(
        userId= 4, questionId=9 , comment = 'You use this element to wrap sections of text for styling purposes or to add attributes to a section of text without creating a new line of content.'
    )
    comment13 = Comment(
        userId= 5, questionId=10 , comment = 'I personally love the .filter method. Look into it on MDN for more information'
    )
    comment14 = Comment(
        userId= 6, questionId=11 , comment = 'In my opinion Python is easier to understand. To each their own though.'
    )
    comment15 = Comment(
        userId= 7, questionId=12 , comment = 'I would checkout flexbox froggy!'
    )
    comment16 = Comment(
        userId= 8, questionId=1 , comment = 'I think you can `sudo apt install python 3.#`'
    )
    comment17 = Comment(
        userId= 1, questionId=2 , comment = 'For loops iterate over things like arrays or strings. You can then do something with the value of the iterable at whatever index. (array[i])'
    )
    comment18 = Comment(
        userId= 2, questionId=3 , comment = "Ask Anthony, he'll know"
    )
    comment19 = Comment(
        userId= 3, questionId=4 , comment = 'I have no clue!!'
    )
    comment20 = Comment(
        userId= 4, questionId=10 , comment = 'The .find method is pretty good. Lets you find something you specify anywhere within an array'
    )
    comment21 = Comment(
        userId= 5, questionId=6 , comment = 'What do you have so far?'
    )
    comment22 = Comment(
        userId= 6, questionId= 7, comment = "I'm a huge fan of the <li> and <ul> tags personally!!"
    )

    comment23 = Comment(
        userId=3, questionId=1, comment="Consider using Conda for managing Python versions—it provides cross-platform isolation with specific Python versions and packages."
    )

    comment24 = Comment(
        userId=6, questionId=1, comment="Docker is another option for Python environments, encapsulating the entire development environment for consistency and deployment simplicity."
    )


    comment25 = Comment(
        userId=1, questionId=2, comment="Try the 'for...of' loop in JavaScript for cleaner array iteration without the need for an index variable."
    )

    comment26 = Comment(
        userId=7, questionId=2, comment="Explore 'map' and 'filter' functions in JavaScript for advanced array looping and transformation."
    )

    comment27 = Comment(
        userId=4, questionId=2, comment="Consider the 'reduce' function for accumulating values from an array in JavaScript."
    )


    comment28 = Comment(
        userId=2, questionId=3, comment="Use 'morgan' middleware in Express for detailed HTTP request logging during development."
    )

    comment29 = Comment(
        userId=8, questionId=3, comment="Custom middleware in Express is versatile—use it for tasks like input validation or authentication."
    )

    comment30 = Comment(
        userId=5, questionId=3, comment="For Express error handling, check out 'express-async-errors' middleware for simplifying try-catch blocks in asynchronous routes."
    )


    comment31 = Comment(
        userId=1, questionId=4, comment="Enhance asynchronous operations in JavaScript with the Fetch API for simplified HTTP requests."
    )

    comment32 = Comment(
        userId=6, questionId=4, comment="Use async functions with 'await' in JavaScript for sequential and readable handling of asynchronous tasks."
    )

    comment33 = Comment(
        userId=2, questionId=4, comment="Chain Promises using 'then' for structured asynchronous code in JavaScript."
    )


    comment34 = Comment(
        userId=3, questionId=5, comment="In Python, grasp the mutability concept: lists are mutable, tuples are immutable, and dictionaries offer efficient key-value storage."
    )

    comment35 = Comment(
        userId=7, questionId=5, comment="Dictionaries in Python are powerful for key-value pairs, providing quick lookups and efficiency."
    )

    comment36 = Comment(
        userId=4, questionId=5, comment="Explore sets in Python for tasks requiring unique elements and efficient membership checks."
    )

    comment37 = Comment(
        userId=8, questionId=6, comment="Resetting a database in Express with Sequelize? Consider 'sequelize db:drop' followed by 'sequelize db:create' for safety."
    )

    comment38 = Comment(
        userId=2, questionId=6, comment="For safer resets, use a Sequelize seed script to repopulate data after recreating the database."
    )

    comment39 = Comment(
        userId=1, questionId=6, comment="Version control your Sequelize migrations for a safety net during database changes."
    )


    comment40 = Comment(
        userId=3, questionId=7, comment="My go-to HTML tag is <div> for versatile content structuring with CSS styling."
    )

    comment41 = Comment(
        userId=5, questionId=7, comment="The <a> (anchor) tag is versatile, serving for navigation and interactive components with proper styling and JavaScript."
    )

    comment42 = Comment(
        userId=6, questionId=7, comment="Favorite tag? <img>—seamless integration of images into web pages, especially with responsive design techniques."
    )


    comment43 = Comment(
        userId=7, questionId=8, comment="Use 'display: flex;' for a flexible and responsive layout in CSS. Flex properties simplify element positioning."
    )

    comment44 = Comment(
        userId=1, questionId=8, comment="Explore the 'transform' property in CSS for creative effects like rotation, scaling, and skewing."
    )

    comment45 = Comment(
        userId=3, questionId=8, comment="Leverage CSS variables for efficient styling. Define reusable values for consistency across stylesheets."
    )


    comment46 = Comment(
        userId=2, questionId=9, comment="Use the <span> tag in HTML for applying inline styles to specific text within larger blocks."
    )

    comment47 = Comment(
        userId=4, questionId=9, comment="Combine <span> with CSS classes for consistent styling, providing centralized control over text elements."
    )

    comment48 = Comment(
        userId=6, questionId=9, comment="For dynamic changes, manipulate <span> content using JavaScript—ideal for updating text portions."
    )


    comment49 = Comment(
        userId=8, questionId=10, comment="Extract data from arrays in JavaScript efficiently using the 'map' function for transformation."
    )

    comment50 = Comment(
        userId=1, questionId=10, comment="For specific element extraction, employ the 'filter' method. Create a new array with elements meeting specific criteria."
    )

    comment51 = Comment(
        userId=3, questionId=10, comment="Complex operations? Try the 'reduce' method to accumulate values from an array in JavaScript."
    )


    comment52 = Comment(
        userId=4, questionId=11, comment="Python excels in data analysis and machine learning. JavaScript is essential for dynamic and interactive web applications."
    )

    comment53 = Comment(
        userId=6, questionId=11, comment="Advantage of Python? Extensive library ecosystem. JavaScript's strength lies in front-end development, seamlessly connecting with web browsers."
    )

    comment54 = Comment(
        userId=2, questionId=11, comment="Choose Python or JavaScript based on project requirements and your familiarity with the language and associated tools."
    )


    comment55 = Comment(
        userId=3, questionId=12, comment="For an in-depth understanding of flex"
    )

    comment56 = Comment(
        userId=5, questionId=12, comment="W3Schools is another great resource for learning about flex in CSS. Their tutorials are beginner-friendly and provide practical examples."
    )

    comment57 = Comment(
        userId=7, questionId=12, comment="Flexbox Froggy is a fun interactive game that helps reinforce your understanding of flex properties. It's a playful way to master flex in CSS."
    )


    comment58 = Comment(
        userId=8, questionId=13, comment="Choosing between Express and Flask depends on your project needs. Express is robust for building APIs, while Flask is known for its simplicity in web development."
    )

    comment59 = Comment(
        userId=1, questionId=13, comment="Consider the language preference when choosing between Express and Flask. If you're more comfortable with JavaScript, Express might be a natural fit."
    )

    comment60 = Comment(
        userId=3, questionId=13, comment="Explore both Express and Flask documentation to get a feel for their features and see which aligns better with your development style and requirements."
    )


    comment61 = Comment(
        userId=2, questionId=14, comment="Python 2 and Python 3 differ in their approach to string handling, with Python 3 introducing Unicode as the default string type for improved internationalization support."
    )

    comment62 = Comment(
        userId=4, questionId=14, comment="Key differences between Python 2 and Python 3 include the print statement, integer division, and the 'range' function. Transitioning to Python 3 is recommended for compatibility and support."
    )

    comment63 = Comment(
        userId=6, questionId=14, comment="Python 2 reached its end of life, and ongoing development and support are focused on Python 3. It's crucial to migrate to Python 3 for security and feature updates."
    )


    comment64 = Comment(
        userId=8, questionId=15, comment="Handling exceptions in Python is essential for robust error management. Use 'try' and 'except' blocks to gracefully handle potential issues and prevent application crashes."
    )

    comment65 = Comment(
        userId=1, questionId=15, comment="Consider using specific exception classes in Python, such as 'except ValueError' or 'except FileNotFoundError,' for targeted error handling and more precise control over exceptions."
    )

    comment66 = Comment(
        userId=3, questionId=15, comment="Logging exceptions in Python using the 'logging' module can aid in debugging and provide valuable insights into the cause of errors during development and production."
    )


    comment67 = Comment(
        userId=5, questionId=16, comment="Best practices for writing clean and readable Python code include adhering to the PEP 8 style guide. Consistent indentation, naming conventions, and code structure enhance code readability."
    )

    comment68 = Comment(
        userId=7, questionId=16, comment="Documenting your Python code with clear and concise comments using docstrings improves maintainability and helps others understand the purpose and functionality of your code."
    )

    comment69 = Comment(
        userId=2, questionId=16, comment="Utilize meaningful variable and function names in Python. Descriptive names contribute to code clarity and reduce the need for excessive comments to explain functionality."
    )


    comment70 = Comment(
        userId=4, questionId=17, comment="Closures in JavaScript are powerful for creating private variables and functions. They encapsulate state within a function, providing a clean way to implement data hiding."
    )

    comment71 = Comment(
        userId=6, questionId=17, comment="JavaScript closures are useful for creating functions with persistent state. They enable the creation of modular and reusable code by preserving the lexical scope."
    )

    comment72 = Comment(
        userId=8, questionId=17, comment="Understanding closures in JavaScript is crucial for advanced concepts like currying and function factories. They offer a flexible way to structure and organize code."
    )


    comment73 = Comment(
        userId=1, questionId=18, comment="Hoisting in JavaScript involves the interpreter moving variable and function declarations to the top of the scope during the compilation phase. It's important to be aware of potential issues with hoisting."
    )

    comment74 = Comment(
        userId=3, questionId=18, comment="Be cautious with hoisting in JavaScript to avoid unexpected behavior. It's advisable to declare variables and functions before using them to ensure clarity in your code."
    )

    comment75 = Comment(
        userId=5, questionId=18, comment="Understanding hoisting in JavaScript is key to preventing bugs. Always declare variables and functions at the beginning of their scope for consistent and predictable behavior."
    )

    comment76 = Comment(
        userId=7, questionId=19, comment="JavaScript handles asynchronous operations using callbacks by executing functions once an asynchronous task completes. This pattern is foundational for older codebases."
    )

    comment77 = Comment(
        userId=2, questionId=19, comment="Promises in JavaScript offer a cleaner and more structured approach to handling asynchronous operations compared to callbacks. They simplify error handling and make code more readable."
    )

    comment78 = Comment(
        userId=4, questionId=19, comment="Asynchronous operations in JavaScript benefit from async/await syntax, providing a synchronous-like structure for asynchronous code. It enhances code readability and maintainability."
    )

    comment79 = Comment(
        userId=6, questionId=20, comment="Arrow functions in JavaScript provide a concise syntax for writing functions. They have implicit returns and share the same 'this' as their surrounding code, making them handy for certain scenarios."
    )

    comment80 = Comment(
        userId=8, questionId=20, comment="Differences between arrow functions and regular functions in JavaScript include the binding of 'this' and the absence of the 'arguments' object in arrow functions. Choose based on your specific use case."
    )

    comment81 = Comment(
        userId=1, questionId=20, comment="Use arrow functions judiciously in JavaScript. While they offer brevity, be mindful of their implications, especially when dealing with complex or lengthy functions."
    )

    comment82 = Comment(
        userId=3, questionId=21, comment="Middleware in Express acts as a bridge between incoming requests and route handlers. It's instrumental for tasks like authentication, logging, and error handling."
    )
    comment83 = Comment(
        userId=5, questionId=21, comment="Utilize Express middleware to modularize your application. It enhances maintainability by organizing code into manageable and reusable components."
    )

    comment84 = Comment(
        userId=7, questionId=21, comment="For understanding middleware in Express, the official Express documentation is a comprehensive resource. It provides insights into implementation and best practices."
    )

    comment85 = Comment(
        userId=1, questionId=22, comment="Routers in Express help organize routes and distribute route handling across multiple files. This promotes a modular and scalable approach to building web applications."
    )

    comment86 = Comment(
        userId=3, questionId=22, comment="When using routers in Express, maintain a clear structure for route files. Group related routes together to enhance code organization and ease of maintenance."
    )

    comment87 = Comment(
        userId=5, questionId=22, comment="Express routers are powerful for building RESTful APIs. They allow you to define routes in a structured manner, making it easier to manage and extend your application."
    )

    comment88 = Comment(
        userId=7, questionId=23, comment="Handling form data in Express involves using the 'body-parser' middleware for parsing incoming requests. Ensure it's properly configured to access form data in your routes."
    )

    comment89 = Comment(
        userId=2, questionId=23, comment="Consider using 'express-validator' for form data validation in Express. It provides a convenient way to validate and sanitize user input before processing it in your routes."
    )

    comment90 = Comment(
        userId=4, questionId=23, comment="When submitting form data from the frontend to Express, ensure proper handling of CORS (Cross-Origin Resource Sharing) to allow secure communication between different origins."
    )

    comment91 = Comment(
        userId=6, questionId=24, comment="Express.static middleware serves static files, such as images or stylesheets. Properly configure it by specifying the directory containing your static assets."
    )

    comment92 = Comment(
        userId=8, questionId=24, comment="Use Express.static middleware strategically for optimizing the delivery of static assets. Consider integrating it with a content delivery network (CDN) for improved performance."
    )

    comment93 = Comment(
        userId=1, questionId=24, comment="When working with Express.static, leverage caching mechanisms for static assets to enhance the speed and efficiency of your web application."
    )

    comment94 = Comment(
        userId=3, questionId=25, comment="Performing a JOIN operation in Sequelize involves defining associations between models. Use 'include' options in queries to fetch data from multiple tables."
    )

    comment95 = Comment(
        userId=5, questionId=25, comment="Sequelize associations, such as 'belongsTo' and 'hasMany,' establish relationships between tables. Understanding these associations is crucial for accurate JOIN operations."
    )

    comment96 = Comment(
        userId=7, questionId=25, comment="Consider Sequelize's 'include' option with 'attributes' to selectively retrieve specific columns when performing JOIN operations for optimized data fetching."
    )

    comment97 = Comment(
        userId=2, questionId=26, comment="Migrations in Sequelize allow you to make organized changes to your database schema. Use 'sequelize migration:create' to generate a new migration file and define your schema changes."
    )

    comment98 = Comment(
        userId=4, questionId=26, comment="Sequelize migrations provide a version control system for your database schema. Each migration file represents a step in the evolution of your database structure."
    )

    comment99 = Comment(
        userId=6, questionId=26, comment="When altering existing models, generate migrations in Sequelize to maintain consistency across development, staging, and production databases."
    )

    comment100 = Comment(
        userId=8, questionId=27, comment="Sequelize hooks are callback functions that allow you to inject custom logic at various stages of the database operation lifecycle. Explore 'beforeCreate' and 'afterUpdate' hooks for specific tasks."
    )

    comment101 = Comment(
        userId=1, questionId=27, comment="Leverage Sequelize hooks for tasks like data validation, logging, or sending notifications. They provide flexibility in customizing the behavior of database operations."
    )

    comment102 = Comment(
        userId=3, questionId=27, comment="Ensure Sequelize hooks are used judiciously to maintain code readability. Consider encapsulating complex logic in separate modules for better organization."
    )

    comment103 = Comment(
        userId=5, questionId=28, comment="Implementing pagination in Sequelize involves using 'offset' and 'limit' options in queries. Additionally, consider sorting results to ensure consistent ordering across paginated requests."
    )

    comment104 = Comment(
        userId=7, questionId=28, comment="Sequelize's 'paginate' method simplifies the implementation of pagination by providing an easy-to-use interface for retrieving subsets of records from a large dataset."
    )

    comment105 = Comment(
        userId=2, questionId=28, comment="When designing paginated APIs with Sequelize, consider incorporating query parameters like 'page' and 'pageSize' for client-driven control over the displayed data."
    )

    comment106 = Comment(
        userId=4, questionId=29, comment="The meta tag in HTML plays a crucial role in providing metadata about a web page. Utilize attributes like 'charset,' 'viewport,' and 'description' to enhance page presentation and SEO."
    )

    comment107 = Comment(
        userId=6, questionId=29, comment="For SEO optimization, ensure the 'title' attribute in the meta tag accurately reflects the content of the web page. It influences search engine rankings and user click-through rates."
    )

    comment108 = Comment(
        userId=8, questionId=29, comment="Understanding the impact of the meta tag on social media sharing is vital. Specify 'og:title' and 'og:description' attributes for consistent and appealing previews when shared on platforms like Facebook."
    )

    comment109 = Comment(
        userId=1, questionId=30, comment="Creating a responsive design in HTML and CSS involves using media queries to adapt the layout based on the device's screen size. Test your design across various devices to ensure compatibility."
    )

    comment110 = Comment(
        userId=3, questionId=30, comment="Utilize CSS frameworks like Bootstrap or Flexbox to streamline the process of building responsive designs. They offer pre-built components and responsive utilities for efficient development."
    )

    comment111 = Comment(
        userId=5, questionId=30, comment="Consider mobile-first design principles when creating responsive layouts. Start with a mobile-friendly design and progressively enhance the layout for larger screens using media queries."
    )
    comment112 = Comment(
        userId=8, questionId=31, comment="The HTML form element serves as a container for user input. Use JavaScript event listeners to handle form submissions, providing a seamless user experience."
    )

    comment113 = Comment(
        userId=1, questionId=31, comment="Explore form validation techniques in JavaScript to ensure that user input meets the required criteria before submitting the form to the server."
    )

    comment114 = Comment(
        userId=3, questionId=31, comment="Consider using the 'submit' event in JavaScript to intercept form submissions. This allows for additional processing or validation before the data is sent to the server."
    )

    comment115 = Comment(
        userId=1, questionId=32, comment="The box model in CSS defines the layout of elements, including content, padding, borders, and margins. Understanding it is crucial for precise control over your webpage layout."
    )

    comment116 = Comment(
        userId=5, questionId=32, comment="The box model simplifies the positioning and sizing of elements on a webpage. Utilize the 'box-sizing' property to control how the width and height are calculated."
    )

    comment117 = Comment(
        userId=7, questionId=32, comment="Flexibility in designing layouts is achieved by mastering the CSS box model. Use it in conjunction with other layout techniques like Flexbox and Grid for comprehensive control."
    )

    comment118 = Comment(
        userId=3, questionId=33, comment="CSS preprocessors like Sass and Less bring additional functionality to stylesheets. They introduce variables, nesting, and functions, enhancing code organization and maintainability."
    )

    comment119 = Comment(
        userId=5, questionId=33, comment="Sass, in particular, allows for modular CSS with features like partials and imports. It's a powerful tool for managing styles in large projects."
    )

    comment120 = Comment(
        userId=7, questionId=33, comment="Explore CSS preprocessors to streamline your stylesheet workflow. They provide features that make styling more efficient and maintainable in complex projects."
    )

    comment121 = Comment(
        userId=7, questionId=34, comment="Implementing a sticky navigation bar in CSS enhances user experience. Use 'position: sticky;' along with appropriate positioning values to create a navigation bar that sticks to the top."
    )

    comment122 = Comment(
        userId=1, questionId=34, comment="Sticky navigation bars are beneficial for better website navigation, especially in long-scrolling pages. Ensure compatibility with various browsers by testing your implementation."
    )

    comment123 = Comment(
        userId=3, questionId=34, comment="Consider using JavaScript to add dynamic behavior to your sticky navigation bar, such as smooth scrolling and highlighting the current section."
    )

    comment124 = Comment(
        userId=8, questionId=35, comment="CSS Grid and Flexbox are powerful layout tools in CSS. Flexbox is suitable for one-dimensional layouts, while Grid excels in two-dimensional layouts, providing precise control over rows and columns."
    )

    comment125 = Comment(
        userId=2, questionId=35, comment="Choosing between CSS Grid and Flexbox depends on the specific layout requirements. Flexbox is great for items in a single dimension, while Grid is ideal for complex two-dimensional layouts."
    )

    comment126 = Comment(
        userId=4, questionId=35, comment="For responsive design, combine CSS Grid and Flexbox based on the layout needs of different sections of your webpage. They complement each other for creating versatile and responsive layouts."
    )

    comment127 = Comment(
        userId=4, questionId=36, comment="Media queries in CSS are essential for creating a mobile-friendly design. Use them to apply specific styles based on the device's screen size, ensuring a seamless experience across various devices."
    )

    comment128 = Comment(
        userId=6, questionId=36, comment="Consider a mobile-first approach when using media queries. Start with styles for smaller screens and progressively enhance them for larger screens, promoting a responsive and adaptive design."
    )

    comment129 = Comment(
        userId=2, questionId=36, comment="Media queries allow you to tailor your website's appearance to different devices. Test your design across various screen sizes to ensure a consistent and visually appealing user experience."
    )

    db.session.add(pythoncomm)
    db.session.add(javascriptcomm)
    db.session.add(expresscomm)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)
    db.session.add(comment18)
    db.session.add(comment19)
    db.session.add(comment20)
    db.session.add(comment21)
    db.session.add(comment22)
    db.session.add(comment23)
    db.session.add(comment24)
    db.session.add(comment25)
    db.session.add(comment26)
    db.session.add(comment27)
    db.session.add(comment28)
    db.session.add(comment29)
    db.session.add(comment30)
    db.session.add(comment31)
    db.session.add(comment32)
    db.session.add(comment33)
    db.session.add(comment34)
    db.session.add(comment35)
    db.session.add(comment36)
    db.session.add(comment37)
    db.session.add(comment38)
    db.session.add(comment39)
    db.session.add(comment40)
    db.session.add(comment41)
    db.session.add(comment42)
    db.session.add(comment43)
    db.session.add(comment44)
    db.session.add(comment45)
    db.session.add(comment46)
    db.session.add(comment47)
    db.session.add(comment48)
    db.session.add(comment49)
    db.session.add(comment50)
    db.session.add(comment51)
    db.session.add(comment52)
    db.session.add(comment53)
    db.session.add(comment54)
    db.session.add(comment55)
    db.session.add(comment56)
    db.session.add(comment57)
    db.session.add(comment58)
    db.session.add(comment59)
    db.session.add(comment60)
    db.session.add(comment61)
    db.session.add(comment62)
    db.session.add(comment63)
    db.session.add(comment64)
    db.session.add(comment65)
    db.session.add(comment66)
    db.session.add(comment67)
    db.session.add(comment68)
    db.session.add(comment69)
    db.session.add(comment70)
    db.session.add(comment71)
    db.session.add(comment72)
    db.session.add(comment73)
    db.session.add(comment74)
    db.session.add(comment75)
    db.session.add(comment76)
    db.session.add(comment77)
    db.session.add(comment78)
    db.session.add(comment79)
    db.session.add(comment80)
    db.session.add(comment81)
    db.session.add(comment82)
    db.session.add(comment83)
    db.session.add(comment84)
    db.session.add(comment85)
    db.session.add(comment86)
    db.session.add(comment87)
    db.session.add(comment88)
    db.session.add(comment89)
    db.session.add(comment90)
    db.session.add(comment91)
    db.session.add(comment92)
    db.session.add(comment93)
    db.session.add(comment94)
    db.session.add(comment95)
    db.session.add(comment96)
    db.session.add(comment97)
    db.session.add(comment98)
    db.session.add(comment99)
    db.session.add(comment100)
    db.session.add(comment101)
    db.session.add(comment102)
    db.session.add(comment103)
    db.session.add(comment104)
    db.session.add(comment105)
    db.session.add(comment106)
    db.session.add(comment107)
    db.session.add(comment108)
    db.session.add(comment109)
    db.session.add(comment110)
    db.session.add(comment111)
    db.session.add(comment112)
    db.session.add(comment113)
    db.session.add(comment114)
    db.session.add(comment115)
    db.session.add(comment116)
    db.session.add(comment117)
    db.session.add(comment118)
    db.session.add(comment119)
    db.session.add(comment120)
    db.session.add(comment121)
    db.session.add(comment122)
    db.session.add(comment123)
    db.session.add(comment124)
    db.session.add(comment125)
    db.session.add(comment126)
    db.session.add(comment127)
    db.session.add(comment128)
    db.session.add(comment129)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
