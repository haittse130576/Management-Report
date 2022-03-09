export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    
  },
  {
    component: 'CNavGroup',
    name: 'Accounts',
    to: '/accounts',
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
        name: 'Report',
        to: '/user/report'
      },
      {
        component: 'CNavItem',
        name: 'Manage Reports',
        to: '/admin/manageReport'
      },

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
      }
    ],
  }
]
