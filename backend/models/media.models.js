import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  name: String,
  contentType: String,
  data: Buffer,
});

export default mongoose.model('Media', mediaSchema);
