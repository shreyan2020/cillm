import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import Editor from "./components/ABScribe/Editor";
import Viewer from "./components/ABScribe/Viewer";
import Tutorial from "./components/Home/Tutorial";
import Docs from "./components/Docs/docs";
import Welcome from "./components/Home/Welcome";
import JobDescription from "./components/Home/JobDescription";
import Task from "./components/Home/Task";
import Questionnaire from "./components/Home/Questionnaire";
import Survey from "./components/Home/Survey";
import DonationSurvey from "./components/Home/DonationSurvey";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-tooltip/dist/react-tooltip.css";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import DocumentList from "./components/DocumentsView/DocumentList";
import DocumentContainer from "./components/ABScribe/DocumentContainer";
import { TaskProvider } from "./context/TaskContext"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/tutorial",
        element: <Tutorial />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/instruction",
        element: <JobDescription />,
      },
      {
        path: "/task",
        element: <Task />,
      },
      // {
      //   path: "/questionnaire",
      //   element: <Questionnaire />,
      // },
      {
        path: "/survey",
        element: <Survey />,
      },
      {
        path: "/donation",
        element: <DonationSurvey />,
      },
      {
        path: "/editor",
        element: <Editor />,
      },

      {
        path: "/document/:documentId",
        element: <DocumentContainer />,
      },
      {
        path: "/document/",
        element: <DocumentContainer />,
      },
      {
        path: "/viewer",
        element: <Viewer />,
      },
      {
        path: "/docs",
        element: <Docs />,
      },
      {
        path: "/documentlist",
        element: <DocumentList />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </React.StrictMode>
);

reportWebVitals();
