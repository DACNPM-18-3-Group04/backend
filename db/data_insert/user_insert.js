const db = require('../../configs/database');
const UserService = require('../../components/user/services');

// Datas
const adminUID = 12;
const email_prefix = 'testuser';
const email_postfix = '@webbds.com';
const email_number_start = 1; // Email format: {email_prefix}{number}{email_postfix}
const numUserToInsert = 100;
const usersData = [
  {
    fullname: 'Nguyễn Thị C',
    contact_number: '0129012345',
  },
  {
    fullname: 'Trần Hữu D',
    contact_number: '0129012345',
  },
  {
    fullname: 'Lê Văn E',
    contact_number: '0129012345',
  },
];

const insertUserRow = async (index = 1) => {
  const param_row = {
    user: {
      id: adminUID,
    },
    email: `${email_prefix}${index}${email_postfix}`,
    password: `${email_prefix}${index}@Password1`,
    fullname: usersData[index % usersData.length].fullname,
    contact_number: usersData[index % usersData.length].contact_number,
  };
  try {
    await UserService.handleAdminRegiserUserAccount(param_row);
    console.log(`Inserted ${param_row.email} successfully!`);
  } catch (error) {
    console.log(error);
  }
};

const insertUsers = async () => {
  const endNum = email_number_start + numUserToInsert;
  console.log(endNum);
  // eslint-disable-next-line no-plusplus
  for (let i = email_number_start; i < endNum; i++) {
    insertUserRow(i);
  }
  console.log('Done calling insert');
};

// Test DB
db.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    db.sync()
      .then(() => {
        console.log('Database synced successfully');
        insertUsers();
      })
      .catch((err) => console.log(`Sync error: ${err.message}`));
  })
  .catch((err) => console.log('Database connection error: ', err));
