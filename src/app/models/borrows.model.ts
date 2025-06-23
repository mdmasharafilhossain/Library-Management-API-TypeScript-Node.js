import { model, Schema, Types } from "mongoose";



const borrowSchema = new Schema({
book:{
    type: Types.ObjectId,
    ref: 'Book',
    required: true
},
quantity:{
    type: Number,
    required: true,
    min: 1
},
dueDate:{
    type: Date,
    required: true
},
 


},{
    timestamps: true,})

    borrowSchema.post('save', function (doc) {
  console.log(`Borrow saved  BookID: ${doc.book}, Quantity: ${doc.quantity}`);
});

export const Borrow = model('Borrow', borrowSchema);    