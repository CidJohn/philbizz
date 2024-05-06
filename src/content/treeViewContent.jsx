 const treeViewContent = [
    {
      name: 'Tagaytay',
      children: [
        {
          name: 'Hair Salon',
          children: [],
          onclick: 'SALON'
          
        },
        {
          name: 'KTV',
          children: [],
          onclick:'KTV'
        },
        {
          name: 'Item 3',
          children: [
            {
              name: 'Subitem 1',
              children: [],
            },
            {
              name: 'Subitem 2',
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: 'Cebu',
      children: [
        {
          name: 'Salon',
          children: [],
        },
        {
          name: 'Item 2',
          children: [
            {
              name: 'Subitem 1',
              children: [],
            },
            {
              name: 'Subitem 2',
              children: [],
            },
          ],
        },
        {
          name: 'Item 3',
          children: [],
        },
      ],
    },
  ];

  export default treeViewContent