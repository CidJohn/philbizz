const treeViewContent = [
  {
    name: 'KTV',
    path: '/business',
    children: [
        {
          id: 1,
          name: 'Manila',
          children: [],

        },
        {
          id: 2,
          name: 'Makati',
          children: [],

        },
        {
          id: 3,
          name: 'Laguna',
          children: [],
        },
        {
          id: 4,
          name: 'Cebu',
          children: [],
          onclick: '/ktv'
        },
    ],
  },
  {
    path: '/business',
    name: `JTV`,
    children: [
      {
        id: 5,
        name: 'Manila',
        children: [],

      },
      {
        id: 6,
        name: 'Makati',
        children: [],

      },
      {
        id: 7,
        name: 'Laguna',
        children: [],
        path: '/business/laguna',
      },
      {
        id: 8,
        name: 'Cebu',
        children: [],
        path: '/business/cebu',
        onclick: '/ktv'
      },
    ],
  }, 
  {
    path: '/business',
    name: `SALON`,
    children: [
      {
        id: 9,
        name: 'Manila',
        children: [],

      },
      {
        id: 10,
        name: 'Makati',
        children: [],

      },
      {
        id: 11,
        name: 'Laguna',
        children: [],
        path: '/business/laguna',
      },
      {
        id: 12,
        name: 'Cebu',
        children: [],
        path: '/business/cebu',
        onclick: '/ktv'
      },
    ],
  },
  
];

export default treeViewContent;
