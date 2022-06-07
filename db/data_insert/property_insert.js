const db = require('../../configs/database');
const PropertyService = require('../../components/property/services');
const PropertyImageRepo = require('../../components/propertyImage/repository');

const NUM_TO_INSERT = 100;
const data = require('./property.data');
const userIdStart = 81;
const userIdEnd = 180;

const districtIdMap = {
  'Quận 1': 1,
  'Quận 2': 2,
  'Quận 3': 3,
  'Quận 4': 4,
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const insertImages = async (id = 0, images = []) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < images.length; i++) {
    PropertyImageRepo.create({
      propertyId: id,
      link: images[i],
      publicId: null,
    })
      .then(() => console.log(`${id}: Image ${i} insert done`))
      .catch((err) => console.log(err));
  }
};

const insertPropertyRow = async (index = 0) => {
  const uid = (index % (userIdEnd - userIdStart)) + userIdStart;
  const data_row = data[index % data.length];
  const param_row = {
    user: {
      id: uid,
    },
    title: `[${data_row.ma_tt}]${data_row.duong_pho}, ${data_row.phuong_xa}, ${data_row.quan_huyen}, ${data_row.tinh_thanh}`,
    address: `${data_row.duong_pho}, ${data_row.phuong_xa}`,
    district_id: districtIdMap[data_row.quan_huyen],
    description: data_row.mota.substring(0, 500), // Table size = 500
    price: data_row.giaban,
    area: data_row.dientich,
    type: getRandomInt(0, 2) === 0 ? 'S' : 'L',
  };
  const images = data_row.hinh_anh.split(',');
  try {
    const inserted = await PropertyService.handleCreateProperty(param_row);
    // console.log(inserted);
    console.log(`Inserted [${inserted.id}]${param_row.title} successfully!`);
    // console.log(images);
    insertImages(inserted.id, images);
  } catch (error) {
    console.log(error);
  }
};

const insertDatas = async () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < NUM_TO_INSERT; i++) {
    insertPropertyRow(i);
  }
  console.log('Done calling insert');
};

db.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    db.sync()
      .then(() => {
        console.log('Database synced successfully');
        insertDatas();
      })
      .catch((err) => console.log(`Sync error: ${err.message}`));
  })
  .catch((err) => console.log('Database connection error: ', err));
