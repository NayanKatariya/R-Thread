import React from 'react';

import Layout from '../layout';
import RequestReview from '../pages/RequestReview/RequestReview';
import Message from '../pages/Message/Message';
import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';
import Setting from '../pages/Setting/setting';
import AIInbox from '../pages/AI-Inbox/AIInbox';
import CustomerSupport from '../pages/Customer-Support';
import DeployAI from '../components/DeployAI/DeployAI';

export const routes = [
  // {
  //   path: '/get-started',
  //   element: <InitialPage />,
  // },
  // {
  //   path: '/start-quiz',
  //   element: <StartQuiz />,
  // },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  // {
  //   element: <PhoneLogin />,
  // },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'setting',
        element: <Setting />,
      },
      {
        path: 'automation',
        children: [
          {
            path: 'test-conversation/:asin',
            element: <AIInbox />,
          },
          {
            path: 'test-conversation',
            element: <AIInbox />,
          },
          {
            path: 'deploy-ai',
            element: <DeployAI />,
          },
          {
            path: 'customer-support',
            element: <CustomerSupport />,
          },
        ],
      },
      {
        path: 'request-review',
        element: <RequestReview />,
      },

      {
        path: 'message',
        element: <Message />,
      },
    ]
  },
];
