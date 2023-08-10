const db = require("../../models");
const Cliente = db.clientes;

validaCamposRequeridosCliente = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.nome) {
        camposRequeridosEmpty.push("nome");
    }
    if (!req.body.telefone) {
        camposRequeridosEmpty.push("telefone");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Cliente
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCliente(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Cliente
    const cliente = new Cliente({
        nome: req.body.nome ? req.body.nome : null,
        telefone: req.body.telefone ? req.body.telefone : null,
    });

    // Save Cliente in the database
    cliente
        .save(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Cliente."
            });
        });
};

// Procura por todas as entidades do tipo Cliente
exports.findAll = (req, res) => {
    var condition = {};

    Cliente.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cliente."
        });
      });
};

// Busca a entidade Cliente por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Cliente.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Cliente com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Cliente com o id " + id + "."
        });
      });
};

// Altera uma entidade Cliente
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCliente(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Cliente.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cliente com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Cliente com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Cliente com o id " + id + "."
        });
      });
};

// Remove a entidade Cliente por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Cliente.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cliente com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Cliente com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Cliente com o id " + id + "."
        });
      });
};
