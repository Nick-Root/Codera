import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TopicPage from '../components/TopicPage/TopicPage';
import Layout from './Layout';

import MainPage from '../components/MainPage';
import QuestionDetails from '../components/Questions/QuestionDetails'

import QuestionForm from '../components/QuestionForm/QuestionForm';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/test-post",
        element: <QuestionForm/>
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/topics/:topicId",
        element: <TopicPage />
      },
      {
        path: "/questions/:id",
        element: <QuestionDetails />,
      },
      {
        path: "/*",
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);
