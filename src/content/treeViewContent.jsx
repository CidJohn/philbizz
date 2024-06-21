 const treeViewContent = [
    {
      path: '/ktv',
      children: [
        {
          name: 'Manila',
          children: [
            {
              name: `Rockstar KTV`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `蘭桂坊 CLUB LOUIS KTV`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `Turtles Family KTV`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `World Music Room Family KTV`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `Top Moree KTV`,
              children: [],
              onclick:'/ktv'
            },
          ],
          onclick: 'ktv'
          
        },{
          name: `Cebu`,
          children: [
            {
              name: `MIYABI JAPANESE KTV`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `W CLUB 19`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `B-pink japanese karaoke bar `,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `Japanese Karaoke Bar CLUB KING`,
              children: [],
              onclick:'/ktv'
            },
            {
              name: `Music One Family KTV And DVD`,
              children: [],
              onclick:'/ktv'
            },
          ],
          onclick: '/ktv'
        }
        
      ],
    },
    {
      path:'/salon',
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