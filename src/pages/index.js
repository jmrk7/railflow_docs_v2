import React from 'react';
import  { Redirect } from 'react-router-dom';
import posthog from 'posthog-js';

export default function Home() {
  posthog.init('phc_FtJftK2TrWqi9kbAqPeVolXtQ1FZ3JIXu7AjMPhj3Dx', { api_host: 'https://app.posthog.com' });
  return <Redirect to='/docs/intro' />;
}