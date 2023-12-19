import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import TopicPage from '../components/TopicPage/TopicPage';
import Layout from './Layout';

import MainPage from '../components/MainPage';
import QuestionDetails from '../components/Questions/QuestionDetails'
import CurrentQuestions from '../components/CurrentQuestions/CurrentQuestions';
import CurrentComments from '../components/CurrentComments/CurrentComments';
import SavedQuestion from '../components/SavedQuestion/SavedQuestion';

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
        path: "/savedQuestions",
        element: <SavedQuestion />
      },
      {
        path: "/questions/:id",
        element: <QuestionDetails />,
      },
      {
        path: '/questions/current',
        element: <CurrentQuestions />
      },
      {
        path: '/comments/current',
        element: <CurrentComments />
      },
      {
        path: "/*",
        element: <h1>Page not found</h1>,
      },

    ],
  },
]);
