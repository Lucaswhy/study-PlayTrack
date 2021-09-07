import { Document, Schema, Model, model } from 'mongoose'
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

interface IUser {
    Name: String,
    Email: String,
    Password: String,
    Avatar?: String
}

export interface UserModel extends IUser, Document {}

const UserSchema = new Schema({

  Name: {
    type: String,
    required: true
  },

  Email: {
    type: String,
    required: true,
    unique: true
  },

  Password: {
    type: String,
    required: true
  },
  Avatar: String

}, {
  timestamps: true
})

UserSchema.plugin(AutoIncrement, { inc_field: 'Id' })

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
