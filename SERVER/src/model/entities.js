// Entity Specifications
const User = [{
  id: 1,
  userName: 'example',
  email: 'example@epicmail.com',
  firstName: 'James',
  lastName: 'Dee',
  password: 'notell',
}, {
  id: 2,
  userName: 'Mekus',
  email: 'Mekus@epicmail.com',
  firstName: 'Emeka',
  lastName: 'Chidelu',
  password: 'pass',
}];

// eslint-disable-next-line no-unused-vars
const Contacts = [{
  id: 1,
  email: 'James@test.com',
  firstName: 'James',
  lastName: 'Dee',
}];

// eslint-disable-next-line no-unused-vars
const Messages = [{
  id: 1,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Subject',
  message: 'lofmifigifng  djkdskinaidpo jnjdnfjndf',
  senderId: 1267,
  receiverId: 4567,
  parentMessageId: 34545,
  status: 'sent', // draft, sent or read
}, {
  id: 2,
  createdOn: 'Tue Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'lorem Ipsum',
  message: 'Vivamus nec dolor est. In tellus ex, aliquet sed ipsum sed, cursus porta nisl. Phasellus id orci arcu. Maecenas quis posuere nisl, nec suscipit mi. Aenean faucibus, diam in efficitur feugiat, neque neque elementum ex, sit amet bibendum erat massa nec dolor. Integer sagittis, ',
  senderId: 2354,
  receiverId: 5445,
  parentMessageId: 2345,
  status: 'draft',
}, {
  id: 3,
  createdOn: 'Wed Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'read',
}, {
  id: 4,
  createdOn: 'Thur Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'read',
}, {
  id: 5,
  createdOn: 'Fri Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'draft',
}, {
  id: 6,
  createdOn: 'Sat Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'sent',
}, {
  id: 7,
  createdOn: 'Sun Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'unread',
}, {
  id: 8,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'unread',
}, {
  id: 9,
  createdOn: 'Tue Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
  subject: 'Ipsum lorem',
  message: 'Phasellus orci ante, euismod vitae quam sit amet, semper pulvinar risus. In augue velit, laoreet condimentum lacinia posuere, placerat eu quam. Donec sit amet ante est. Donec sed ante odio. Nullam bibendum tellus at velit vehicula rhoncus. Cras auctor placerat finibus. Sed ',
  senderId: 5464,
  receiverId: 9358,
  parentMessageId: 9763,
  status: 'unread',
}];

// eslint-disable-next-line no-unused-vars
const Sent = [{
  senderId: 54646,
  messageId: 34545,
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
}];

// eslint-disable-next-line no-unused-vars
const Inbox = [{
  receiverId: 35565,
  messageId: '34545',
  createdOn: 'Mon Mar 04 2019 14:01:23 GMT+0100 (West Africa Standard Time)',
}];

// eslint-disable-next-line no-unused-vars
const Groups = [{
  id: 1,
  name: 'Group 1',
}];

// eslint-disable-next-line no-unused-vars
const GroupMembers = [{
  groupId: 65656,
  memberId: 56563,
}];

const entities = {
  User,
  Contacts,
  Messages,
  Sent,
  Inbox,
  Groups,
  GroupMembers,
};

export default entities;
