// models/mediaModel.js 


const database = require('../config/db');  

const Media = { 
  create: (mediaData, callback) => {  

    const query = `INSERT INTO media_data ( mobile_number, phone_number_id, media_id, filename) VALUES (?, ?, ?, ?)`;
    database.query(query, [ mediaData.mobile_number, mediaData.phone_number_id, mediaData.media_id, mediaData.filename], callback);
  },       

  findByMobileNumber: (mobile_number, callback) => {  
  const query = `SELECT * FROM media_data WHERE mobile_number = ?`;
    database.query(query, [mobile_number], callback);
  },
  
  updateByMobileNumber: (mediaData, callback) => {
    const query = `UPDATE media_data SET media_id = ?, filename = ? WHERE mobile_number = ?`;
    // database.query(query, [mediaData.media_id, mediaData.mobile_number], callback);
    database.query(query, [mediaData.media_id, mediaData.filename, mediaData.mobile_number], callback);

  },

  deleteByMediaId: (media_id, callback) => {
    const query = `DELETE FROM media_data WHERE media_id = ?`;
    database.query(query, [media_id], callback);
  }
};

module.exports = Media;

