function startUsersRotes(app, sequelizeService) {
    app.post(`/users/add`, async (req, res) => {
        const validateEmail = await sequelizeService.verifyUser(req.body.email, req.body.name)
        
        if (!validateEmail) {
            sequelizeService.encryptPassword(req.body.password, async (passwordHash, err) => {
                if (!err) {
                    const newUser = {
                        name: req.body.name,
                        email: req.body.email,
                        password: passwordHash
                    }
                    const userError = await sequelizeService.addNewUser(newUser)

                    if (!userError.status) {
                        res.status(201).json({ message: 'Usuário registrado com sucesso !' })
                    } else {
                        switch (userError.type) {
                            case 'nameError': {
                                res.status(400).json({ message: 'Nome de usuário já utilizado !' })
                            } break
                            case 'emailError': {
                                res.status(400).json({ message: 'Email já registrado !' })
                            }
                            default: {
                                res.status(400).json({ message: 'Usuário não cadastrado !' })
                            }
                        }
                    }
                } else {
                    res.status(400).json({ message: 'Erro no cadastro' })
                }
            })
        } else {
            res.status(400).json({ message: 'Nome ou email já registrado !' })
        }
    })
    app.post(`/users/auth`, async (req, res) => {
        const userByDataBase = await sequelizeService.verifyUser(req.body.email)
        
        if (userByDataBase) {
            sequelizeService.decryptPassword(req.body.password, userByDataBase, (err) => {
                if (err) {
                    res.status(401).json({ message: 'Erro na autenticação !' })
                } else {
                    const token = sequelizeService.authUser(userByDataBase)
                    res.status(200).json({ message: 'Usuario Logado com sucesso !', token })
                }
            })
        } else {
            res.status(401).json({ message: 'Erro na autenticação !' })
        }
    })
}
module.exports = startUsersRotes
