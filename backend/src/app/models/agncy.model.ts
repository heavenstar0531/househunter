import mongoose, { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { AgncyData } from '../requests/agncy';
import { Status } from '../common/types'

let agncySchema = new mongoose.Schema({
    // ------------------------------------------------------------- <<< agency info
 // _id:            { type: ObjectId },   // [id]      # agency id, currently only one agency exists
    income:         { type: ObjectId },   // ->acc
    credit_percent: { type: Number },     // number    # currently fixed at 20%
    rent_percent:   { type: Number },     // number
    sale_percent:   { type: Number },     // number
    admn_id:        { type: ObjectId },   // ->acc
});

export class AgncyModel
{
    private model: Model<any> = mongoose.model( 'agncy', agncySchema );

    // (adm)
    get(): [ Status, AgncyData|null ] {
        throw new Error('TODO');
    }

    // (adm)
    update( updated_agncy: AgncyData ): Status {
        throw new Error('TODO');
    }
}

