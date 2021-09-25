import { Request, Response } from 'express'
import { Album, AlbumModel } from '../models/Album'

class AlbumController {
  public async select (req: Request, res: Response): Promise<Response> {
    const album = await Album.find()
    try {
      return (res.status(200).json({
        error: false,
        data: album
      }))
    } catch (e) {
      console.log('Erro no index de Album. log:' + e)
      return (res.status(500).json({
        error: true,
        data: 'Houve um erro no sistema. Por favor tente novamente mais tarde.'
      }))
    }
  }

  public async selectOne (req: Request, res: Response): Promise<Response> {
    const album = await (<any>Album).find({ Name: { $regex: req.params.name, $options: 'i' } }).populate({ path: 'Music' }).exec()
    return (res.status(200).json({
      error: false,
      data: album
    }))
  }

  public async create (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      const newAlbum: AlbumModel = await Album.create(req.body.data)
      return res.status(200).json({
        error: false,
        data: newAlbum
      })
    } catch (e) {
      console.log('Erro na criação de uma album. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      await Album.findOne({ IdAlbum: req.params.id }).then((album) => {
        if (!album) {
          return res.status(208).json({ error: false, data: 'Esse album não existe.' })
        }
      })
      await Album.findOneAndUpdate({ IdAlbum: req.params.id }, req.body.data)
      return res.status(200).json({
        error: false,
        data: 'Album alterado com sucesso'
      })
    } catch (e) {
      console.log('Erro na edição de uma album. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await Album.findOneAndDelete({ IdAlbum: req.params.id })
      return res.status(200).json({
        error: false,
        data: 'Album deletada com sucesso.'
      })
    } catch (e) {
      console.log('Erro no delete de um album. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }
}

export default new AlbumController()
