const treeViewContent = [
  {
    name: "Manila",
    path: "/ktv_jtv",
    children: [
      {
        id: 1,
        parent: "Ktv/Jtv",
        name: "Makati",
        children: [],
      },
      {
        id: 2,
        parent: "Ktv/Jtv",
        name: "Parañaque",
        children: [],
      },
      {
        id: 5,
        parent: "Ktv/Jtv",
        name: "Taguig",
        children: [],
      },
      {
        id: 4,
        parent: "Ktv/Jtv",
        name: "Cebu",
        children: [],
        onclick: "/ktv",
      },
    ],
  },
  {
    path: "/business",
    name: `Laguna`,
    children: [
      {
        id: 6,
        parent: "Ktv/Jtv",
        name: "Calamba",
        children: [],
      },
      {
        id: 6,
        parent: "Ktv/Jtv",
        name: "Makati",
        children: [],
      },
      {
        id: 7,
        parent: "Ktv/Jtv",
        name: "Laguna",
        children: [],
      },
      {
        id: 8,
        parent: "Ktv/Jtv",
        name: "Cebu",
        children: [],
        onclick: "/ktv",
      },
    ],
  },
];

export default treeViewContent;
