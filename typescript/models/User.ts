import { Document, Schema, Model, model } from 'mongoose'
import { IMusic, MusicSchema } from './Music'
import { IPlaylist, PlaylistSchema } from './Playlist'
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

export interface IUser {
    Id?: Number,
    Name: String,
    Email: String,
    Password: String,
    Avatar?: String,
    Music?: IMusic,
    Playlist?: IPlaylist,
}

export interface IUserProtected {
  Id?: Number,
  Name: String,
  Email: String,
  Avatar?: String,
  Music?: IMusic,
  Playlist?: IPlaylist
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

  Avatar: String,

  Music: {
    type: [MusicSchema],
    default: []
  },

  Playlist: {
    type: [PlaylistSchema],
    default: []
  }

}, {
  timestamps: true
})

UserSchema.plugin(AutoIncrement, { inc_field: 'Id' })

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
