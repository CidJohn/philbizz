const treeViewContent = [
  {
    id: 1,
    name: 'KTV',
    path: '/selection',
    children: [
        {
          id: 2,
          name: 'Manila',
          children: [],

        },
        {
          id: 3,
          name: 'Makati',
          children: [],

        },
        {
          id: 4,
          name: 'Laguna',
          children: [],
          path: '/selection/laguna',
        },
        {
          id: 5,
          name: 'Cebu',
          children: [],
          path: '/selection/cebu',
          onclick: '/ktv'
        },
    ],
  },
  {
    id: 6,
    path: '/selection',
    name: `JTV`,
    children: [
      {
        id: 7,
        name: 'Manila',
        children: [],

      },
      {
        id: 8,
        name: 'Makati',
        children: [],

      },
      {
        id: 9,
        name: 'Laguna',
        children: [],
        path: '/selection/laguna',
      },
      {
        id: 10,
        name: 'Cebu',
        children: [],
        path: '/selection/cebu',
        onclick: '/ktv'
      },
    ],
  },
];

export default treeViewContent;
