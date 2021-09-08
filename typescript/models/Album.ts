import { Document, Schema, Model, model } from 'mongoose'
import { IMusic, MusicSchema } from './Music'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

export interface IAlbum {
    Name: String,
    Artist: String,
    Music: Array<IMusic>,
    Released: Date
}

export interface AlbumModel extends IAlbum, Document {}

const AlbumSchema = new Schema({

  Name: {
    type: String,
    required: true
  },

  Artist: String,

  Music: {
    type: [MusicSchema],
    default: []
  },

  Released: Date

}, {
  timestamps: true
})

AlbumSchema.plugin(AutoIncrement, { inc_field: 'IdAlbum' })

export const Album: Model<AlbumModel> = model<AlbumModel>('Album', AlbumSchema)
