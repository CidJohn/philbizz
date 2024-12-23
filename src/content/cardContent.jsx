const cardContent = [
  {
    user: "John Doe",
    title: "Sample New 1",
    images:
      "https://pi.lipinas.com/wp-content/uploads/2023/12/Chinese-New-Year-Philippines.jpg",
    desc: "Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.",
  },
  {
    user: "John Doe",
    title: "Sample New 2",
    images:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzlx86U7esHHiNyOh2MGicolIZo2vagyEHw&s",
    desc: "Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.",
  },
  {
    user: "John Doe",
    title: "Sample New 3",
    images:
      "https://media.vaticannews.va/media/content/dam-archive/vaticannews/agenzie/images/afp/2019/01/09/01/philippines-religion-black-nazarene-1546992527761.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
    desc: "Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.",
  },
];

export const socialContent = [
  {
    socialmedia: "Facebook",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/1280px-Facebook_Logo_%282019%29.svg.png",
    link: "/",
  },
  {
    socialmedia: "Youtube",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/3/34/YouTube_logo_%282017%29.png",
    link: "/",
  },
  {
    socialmedia: "Instagram",
    imageURL:
      "https://1000logos.net/wp-content/uploads/2017/02/ig-logo-768x256.png",
    link: "/",
  },
  {
    socialmedia: "Gmail",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail2020.logo.png",
    link: "/contact",
  },
];

export const Likeddata = [
  { label: "item 1", value: 150 },
  { label: "item 2", value: 70 },
  { label: "item 3", value: 99 },
  { label: "item 4", value: 13 },
  { label: "item 5", value: 47 },
  { label: "item 6", value: 20 },
];

export const Commentdata = [
  { label: "item 1", value: 100 },
  { label: "item 2", value: 20 },
  { label: "item 3", value: 50 },
  { label: "item 4", value: 60 },
  { label: "item 5", value: 90 },
  { label: "item 6", value: 70 },
];

export const options = {
  series: [
    {
      name: "Blog",
      data: [100, 200, 400, 333, 111, 555, 777],
      color: "#1A56DB",
    },
    {
      name: "Business",
      data: [432, 456, 123, 678, 534, 567, 123],
      color: "#7E3BF2",
    },
    {
      name: "Food",
      data: [267, 854, 346, 975, 999, 666, 777],
      color: "#1abfdc",
    },
    {
      name: "Festival",
      data: [123, 435, 756, 897, 111, 222, 333],
      color: "#51dc1a",
    },
    {
      name: "Beauty",
      data: [112, 134, 543, 235, 764, 777, 800],
      color: "#dc1abc",
    },
    {
      name: "Travel",
      data: [630, 642, 615, 672, 635, 644, 676],
      color: "#1adc92",
    },
    {
      name: "Medical",
      data: [300, 428, 156, 726, 353, 446, 766],
      color: "#1aa2dc",
    },
    {
      name: "Ktv/Jtv",
      data: [600, 628, 656, 626, 353, 446, 766],
      color: "#1adc92",
    },
    {
      name: "Massage",
      data: [630, 648, 156, 676, 633, 646, 676],
      color: "#dc1a92",
    },
  ],
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },

  xaxis: {
    categories: [
      "01 Monday",
      "02 Tuesday",
      "03 Wednesday",
      "04 Thursday",
      "05 Friday",
      "06 Saturday",
      "07 Sunday",
    ],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};


export default cardContent;

