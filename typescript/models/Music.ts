import { Document, Schema, Model, model } from 'mongoose'
import { IAlbum } from './Album'
const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

export interface IMusic {
    Title: String,
    Artist?: String,
    Album?: IAlbum,
    Track?: Number,
    Duration?: String,
    Reproduction?: Number
}

export interface MusicModel extends IMusic, Document {}

export const MusicSchema = new Schema({

  Title: {
    type: String,
    required: true
  },

  Artist: {
    type: String,
    default: 'Unknown artist'
  },

  Album: {
    type: Schema.Types.ObjectId,
    ref: 'Album'
  },

  Track: Number,

  Duration: {
    type: String,
    default: '00:00'
  },

  Reproduction: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

MusicSchema.plugin(AutoIncrement, { inc_field: 'IdMusic' })

export const Music: Model<MusicModel> = model<MusicModel>('Music', MusicSchema)
