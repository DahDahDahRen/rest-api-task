const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const notFound = require("./middleware/notFound");
const customError = require("./middleware/customError");
const connect = require("./db/connect");

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// App level middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Router
app.use("/api/task/v1", taskRouter);
app.use("/api/user/v1", userRouter);

// Custom Error
app.use(customError);

// Not found middleware
app.use(notFound);

// Connect and start the server
const start = async () => {
  try {
    // connect to db
    await connect(process.env.MONGO_URI);

    // start the server
    app.listen(port, () => {
      console.log(`
          
          Server is running!
          For task: http://localhost:${port}/api/task/v1
          For register: http://localhost:${port}/api/register/v1
          `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
