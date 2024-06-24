const treeViewContent = [
  {
    name: 'KTV',
    path: '/selection',
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
    path: '/selection',
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
        path: '/selection/laguna',
      },
      {
        id: 8,
        name: 'Cebu',
        children: [],
        path: '/selection/cebu',
        onclick: '/ktv'
      },
    ],
  }, 
  {
    path: '/selection',
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
        path: '/selection/laguna',
      },
      {
        id: 12,
        name: 'Cebu',
        children: [],
        path: '/selection/cebu',
        onclick: '/ktv'
      },
    ],
  },
];

export default treeViewContent;
