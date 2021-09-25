import { Request, Response } from 'express'
import { Playlist, PlaylistModel } from '../models/Playlist'

class PlaylistController {
  public async select (req: Request, res: Response): Promise<Response> {
    const playlists = await Playlist.find()
    try {
      return (res.status(200).json({
        error: false,
        data: playlists
      }))
    } catch (e) {
      console.log('Erro no index de Playlist. log:' + e)
      return (res.status(500).json({
        error: true,
        data: 'Houve um erro no sistema. Por favor tente novamente mais tarde.'
      }))
    }
  }

  public async selectOne (req: Request, res: Response): Promise<Response> {
    const playlist = await (<any>Playlist).find({ Name: { $regex: req.params.name, $options: 'i' } }).populate({ path: 'Music' }).exec()
    return (res.status(200).json({
      error: false,
      data: playlist
    }))
  }

  public async create (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      const newPlaylist: PlaylistModel = await Playlist.create(req.body.data)
      return res.status(200).json({
        error: false,
        data: newPlaylist
      })
    } catch (e) {
      console.log('Erro na criação de uma playlist. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      await Playlist.findOne({ IdPlaylist: req.params.id }).then((music) => {
        if (!music) {
          return res.status(208).json({ error: true, data: 'Essa playlist não existe.' })
        }
      })
      await Playlist.findOneAndUpdate({ IdPlaylist: req.params.id }, req.body.data)
      return res.status(200).json({
        error: false,
        data: 'Playlist alterado com sucesso'
      })
    } catch (e) {
      console.log('Erro na edição de uma playlist. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await Playlist.findOneAndDelete({ IdPlaylist: req.params.id })
      return res.status(200).json({
        error: false,
        data: 'Playlist deletada com sucesso.'
      })
    } catch (e) {
      console.log('Erro no delete de uma playlist. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }
}

export default new PlaylistController()
