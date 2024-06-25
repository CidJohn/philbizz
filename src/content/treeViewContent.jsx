const treeViewContent = [
  {
    name: 'KTV',
    path: '/business',
    children: [
        {
          id: 1,
        parent: 'Business',
          name: 'Manila',
          children: [],

        },
        {
          id: 2,
        parent: 'Business',
          name: 'Makati',
          children: [],

        },
        {
          id: 3,
        parent: 'Business',
          name: 'Laguna',
          children: [],
        },
        {
          id: 4,
        parent: 'Business',
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
        parent: 'Business',
        name: 'Manila',
        children: [],

      },
      {
        id: 6,
        parent: 'Business',
        name: 'Makati',
        children: [],

      },
      {
        id: 7,
        parent: 'Business',
        name: 'Laguna',
        children: [],
      },
      {
        id: 8,
        parent: 'Business',
        name: 'Cebu',
        children: [],
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
        parent: 'Business',
        name: 'Manila',
        children: [],

      },
      {
        id: 10,
        parent: 'Business',
        name: 'Makati',
        children: [],

      },
      {
        id: 11,
        parent: 'Business',
        name: 'Laguna',
        children: [],
      },
      {
        id: 12,
        parent: 'Business',
        name: 'Cebu',
        children: [],
      },
    ],
  },
  
];

export default treeViewContent;
