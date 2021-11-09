
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog','520'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive','f4c'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post','6c7'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post','f06'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post','bee'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags','e13'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus','ddf'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook','ede'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello','4c2'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola','752'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome','bfa'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','be1'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','c13'),
    routes: [
      {
        path: '/docs/bdd-frameworks/cucumber',
        component: ComponentCreator('/docs/bdd-frameworks/cucumber','53a'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/circleci',
        component: ComponentCreator('/docs/cicd-apps/circleci','4ce'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/github',
        component: ComponentCreator('/docs/cicd-apps/github','dab'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/gitlab',
        component: ComponentCreator('/docs/cicd-apps/gitlab','fe9'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/jenkins',
        component: ComponentCreator('/docs/cicd-apps/jenkins','b48'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/overview',
        component: ComponentCreator('/docs/cicd-apps/overview','2af'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/teamcity',
        component: ComponentCreator('/docs/cicd-apps/teamcity','d47'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/cicd-apps/travis',
        component: ComponentCreator('/docs/cicd-apps/travis','719'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/getting-started/intro',
        component: ComponentCreator('/docs/getting-started/intro','010'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro','aed'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/legal/privacy',
        component: ComponentCreator('/docs/legal/privacy','bdf'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/legal/terms',
        component: ComponentCreator('/docs/legal/terms','91f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/railflow-cli/cli-reference',
        component: ComponentCreator('/docs/railflow-cli/cli-reference','5bf'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/railflow-cli/overview',
        component: ComponentCreator('/docs/railflow-cli/overview','712'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/release-notes/cli',
        component: ComponentCreator('/docs/release-notes/cli','e39'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/release-notes/jenkins',
        component: ComponentCreator('/docs/release-notes/jenkins','a05'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/release-notes/teamcity',
        component: ComponentCreator('/docs/release-notes/teamcity','fc1'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/testing-frameworks/junit',
        component: ComponentCreator('/docs/testing-frameworks/junit','61d'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/testing-frameworks/overview',
        component: ComponentCreator('/docs/testing-frameworks/overview','1d5'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/testing-frameworks/pytest',
        component: ComponentCreator('/docs/testing-frameworks/pytest','15f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/docs/testing-frameworks/testng',
        component: ComponentCreator('/docs/testing-frameworks/testng','da2'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
