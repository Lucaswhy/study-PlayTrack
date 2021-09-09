import { Document, Schema, Model, model } from 'mongoose'
import { IMusic } from './Music'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

export interface IPlaylist {
    Name: String,
    Description: String,
    Music: Array<IMusic>,
    Likes?: Number
}

export interface PlaylistModel extends IPlaylist, Document {}

const PlaylistSchema = new Schema({

  Name: {
    type: String,
    required: true
  },

  Description: {
    type: String
  },

  Music: {
    type: [Schema.Types.ObjectId],
    ref: 'Music',
    default: []
  },

  Likes: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
})

PlaylistSchema.plugin(AutoIncrement, { inc_field: 'IdPlaylist' })

export const Playlist: Model<PlaylistModel> = model<PlaylistModel>('Playlist', PlaylistSchema)
