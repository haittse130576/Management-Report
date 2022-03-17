export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: 'cil-speedometer',
    
  },
  {
    component: 'CNavGroup',
    name: 'Accounts',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'List Accounts',
        to: '/admin/list-accounts'
      },
      {
        component: 'CNavItem',
        name: 'Groups',
        to: '/admin/groups'
      },
      {
        component: 'CNavItem',
        name: 'Score',
        to: '/admin/scores'
      },
      {
        component: 'CNavItem',
        name: 'Teacher Home',
        to: '/admin/teacher-home'
      }
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Projects',
    to: '/projects',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'List Projects',
        to: '/admin/list-projects'
      },
      {
        component: 'CNavItem',
        name: 'Manage Reports',
        to: '/admin/reports'
      },
    ],
  }
]
