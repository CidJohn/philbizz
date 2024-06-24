const navbarContent = [
    {
        name: "Business",
        children: [],
        path: "/business",
    },
        {
        name: "Food",
         children: [],
         path: "/food"
    },
        {
        name: "Golf",
         children: [
            {
                childname: "Golf1",
                path: "/"
            },
                        {
                childname: "Golf2",
                path: "/"
            },
                        {
                childname: "Golf3",
                path: "/"
            }
        ]
    },
    {
        name: "Medical",
        children: [
            {
                childname: "Medical1",
                path: "/"
            },
                        {
                childname: "Medical2",
                path: "/"
            },
                        {
                childname: "Medical3",
                path: "/"
            }
        ]
    },
    {
        name: "Perform",
        path: "/"
    },
    {
        name: "Festival",
        path: "/"
    },
        {
        name: "Massage/Sing",
        path: "/"
    },
    
]

export default navbarContent;