const Media = require('../models/mediaModel');  

// Post media
exports.createMedia = (req, res) => {  
  const { mobile_number, phone_number_id, media_id, filename } = req.body;  
  const mediaData = { 
    
    mobile_number,
    phone_number_id,
    media_id,
    filename
  };

  
  Media.create(mediaData, (err, result) => { 
    if (err) return res.status(500).send(err); 
    res.status(201).send({ message: 'Media entry created successfully', data: result }); 

  });
};




// Get media 
exports.getMediaByMobileNumber = (req, res) => {  
  const { mobile_number } = req.params;

  Media.findByMobileNumber(mobile_number, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ message: 'No entry found' });
    res.status(200).send(result);
  });
};




// Update media
exports.updateMediaByMobileNumber = (req, res) => {
  const { mobile_number, media_id, filename } = req.body;

  const mediaData = {
    
    mobile_number,
    media_id,
    filename
  };




  Media.updateByMobileNumber(mediaData, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'No entry found to update' });
    res.status(200).send({ message: 'Media entry updated successfully' });
  });
};




// Delete media 
exports.deleteMediaByMediaId = (req, res) => {
  const { media_id } = req.params;

  Media.deleteByMediaId(media_id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'No entry found to delete' });
    res.status(200).send({ message: 'Media entry deleted successfully' });
  });
};

// Auto Reload Sql Query 
exports.getAllMedia = (req, res) => {
  const query = `SELECT * FROM media_data`;

  database.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching media data:', err);
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};