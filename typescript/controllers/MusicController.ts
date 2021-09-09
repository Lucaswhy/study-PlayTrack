import { Request, Response } from 'express'
import { Music, MusicModel } from '../models/Music'

class MusicController {
  public async select (req: Request, res: Response): Promise<Response> {
    const musics = await Music.find()
    try {
      return (res.status(200).json({
        error: false,
        data: musics
      }))
    } catch (e) {
      console.log('Erro no index de Música. log:' + e)
      return (res.status(500).json({
        error: true,
        data: 'Houve um erro no sistema. Por favor tente novamente mais tarde.'
      }))
    }
  }

  public async selectOne (req: Request, res: Response): Promise<Response> {
    const music = await (<any>Music).find({ Title: { $regex: req.params.title, $options: 'i' } }).exec()
    return (res.status(200).json({
      error: false,
      data: music
    }))
  }

  public async create (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      const newMusic: MusicModel = await Music.create(req.body.data)
      return res.status(200).json({
        error: false,
        data: newMusic
      })
    } catch (e) {
      console.log('Erro na criação de uma música. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: true, data: 'Nenhum dado informado' })
    try {
      await Music.findOne({ IdMusic: req.params.id }).then((music) => {
        if (!music) {
          return res.status(208).json({ error: false, data: 'Essa música não existe.' })
        }
      })
      await Music.findOneAndUpdate({ IdMusic: req.params.id }, req.body.data)
      return res.status(200).json({
        error: false,
        data: 'Música alterado com sucesso'
      })
    } catch (e) {
      console.log('Erro na edição de uma música. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await Music.findOneAndDelete({ IdMusic: req.params.id })
      return res.status(200).json({
        error: false,
        data: 'Música deletada com sucesso.'
      })
    } catch (e) {
      console.log('Erro no delete de uma música. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }
}

export default new MusicController()
