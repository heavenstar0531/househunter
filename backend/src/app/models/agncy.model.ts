import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

let agncySchema = new mongoose.Schema({
 // ------------------------------------------------------------- <<< agency info
 // _id:            { type: ObjectId },   // [id]      # agency id, currently only one agency exists
    income:         { type: ObjectId },   // ->acc
    credit_percent: { type: Number },     // number    # currently fixed at 20%
    rent_percent:   { type: Number },     // number
    sale_percent:   { type: Number },     // number
    admn_id:        { type: ObjectId },   // ->acc
});

class agncyModel
{
    private model: Model<any> = mongoose.model( 'agncy', agncySchema );
}

export { agncyModel };

