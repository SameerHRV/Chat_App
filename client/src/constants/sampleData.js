export const samepleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Akash K",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Manoj M",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sameer H",
    _id: "3",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Rajeev H",
    _id: "4",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Rahul P",
    _id: "5",
    groupChat: true,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://www.w3schools.com/howto/img_avatar.png",
    ],
    name: "Sangamesh Unofficial Group",
    _id: "6",
    groupChat: true,
    members: ["1", "2", "3", "4"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Akash K",
    _id: "1",
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Manoj M",
    _id: "2",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sameer H",
    _id: "3",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Rajeev H",
    _id: "4",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Rahul P",
    _id: "5",
  },
];
export const notifcationUsers = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Akash K",
    },
    _id: "1",
  },

  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Manoj M",
    },
    _id: "2",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Sameer H",
    },
    _id: "3",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Rajeev H",
    },
    _id: "4",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Rahul P",
    },
    _id: "5",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: "1",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Hello Sameer",
    _id: "1",
    sender: {
      _id: "user._id",
      name: "Chaman ",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z",
  },

  {
    attachments: [
      {
        public_id: "2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "Hello",
    _id: "2",
    sender: {
      _id: "2",
      name: "Chaman  2",
    },
    chat: "chatId", // chatId
    createdAt: "2024-02-12T10:41:30.630Z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "John Boi",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "john_boi",
      friends: 20,
      groups: 25,
    },
  ],

  chats: [
    {
      name: "LabadBass Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "L*Da Luston Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "L*uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman ",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman  2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
};
