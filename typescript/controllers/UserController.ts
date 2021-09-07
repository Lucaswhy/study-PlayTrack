import { Request, Response } from 'express'
import { User, UserModel } from '../models/User'

class UserController {
  public async select (req: Request, res: Response): Promise<Response> {
    const users = await User.find()
    try {
      if (users.length > 0) {
        return (res.status(200).json({
          error: false,
          data: users
        }))
      } else {
        return (res.status(204).json({
          error: false,
          data: 'Não há nenhum usuário cadastrado no sistema.'
        }))
      }
    } catch (e) {
      console.log('Erro no index do User. log:' + e)
      return (res.status(500).json({
        error: false,
        data: 'Houve um erro no sistema. Por favor tente novamente mais tarde.'
      }))
    }
  }

  public async selectOne (req: Request, res: Response): Promise<Response> {
    const user = await User.findOne({ Id: req.params.id })
    if (user === null) return (res.status(404).json({ error: false, data: 'Esse usuário não existe no sistema.' }))

    else {
      return (res.status(200).json({
        error: false,
        data: user
      }))
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: false, data: 'Nenhum dado informado' })
    try {
      await User.findOne({ Email: req.body.data.Email }).then((user) => {
        if (user) {
          return res.status(208).json({ error: false, data: 'E-mail já cadastrado.' })
        }
      })
      const newUser: UserModel = await User.create(req.body.data)
      return res.status(200).json({
        error: false,
        data: newUser
      })
    } catch (e) {
      console.log('Erro na criação de um usuário. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    if (req.body.data == null) return res.status(204).json({ error: false, data: 'Nenhum dado informado' })
    try {
      await User.findOne({ Email: req.body.data.Email }).then((user) => {
        if (!user) {
          return res.status(208).json({ error: false, data: 'Esse usuário não existe.' })
        }
      })
      await User.findOneAndUpdate({ Email: req.body.data.Email }, req.body.data)
      return res.status(200).json({
        error: false,
        data: 'Usuário alterado com sucesso'
      })
    } catch (e) {
      console.log('Erro na edição de um usuário. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await User.findOneAndDelete({ Id: req.params.id })
      return res.status(200).json({
        error: false,
        data: 'Usuário deletado com sucesso.'
      })
    } catch (e) {
      console.log('Erro no delete de um usuário. Log:' + e)
      return res.status(500).json({
        error: true,
        data: 'Ocorreu um erro no sistema, por favor, tente novamente mais tarde.'
      })
    }
  }
}

export default new UserController()
