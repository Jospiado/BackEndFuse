const db = require("../../models");
const Cardapio = db.cardapios;

validaCamposRequeridosCardapio = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.name) {
        camposRequeridosEmpty.push("name");
    }
    if (!req.body.preco) {
        camposRequeridosEmpty.push("preco");
    }
    if (!req.body.estoque) {
        camposRequeridosEmpty.push("estoque");
    }
    if (!req.body.ativo) {
        camposRequeridosEmpty.push("ativo");
    }
    if (!req.body.impressora) {
        camposRequeridosEmpty.push("impressora");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Cardapio
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCardapio(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Cardapio
    const cardapio = new Cardapio({
        name: req.body.name ? req.body.name : null,
        preco: req.body.preco ? req.body.preco : null,
        estoque: req.body.estoque ? req.body.estoque : null,
        ativo: req.body.ativo ? req.body.ativo : null,
        impressora: req.body.impressora ? req.body.impressora : null,
    });

    // Save Cardapio in the database
    cardapio
        .save(cardapio)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Cardapio."
            });
        });
};

// Procura por todas as entidades do tipo Cardapio
exports.findAll = (req, res) => {
    var condition = {};

    Cardapio.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cardapio."
        });
      });
};

// Busca a entidade Cardapio por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Cardapio.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Cardapio com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Cardapio com o id " + id + "."
        });
      });
};

// Altera uma entidade Cardapio
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCardapio(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Cardapio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cardapio com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Cardapio com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Cardapio com o id " + id + "."
        });
      });
};

// Remove a entidade Cardapio por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Cardapio.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Cardapio com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Cardapio com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Cardapio com o id " + id + "."
        });
      });
};

// Procura por entidade Cardapio onde o campo booleano ativo seja true
exports.findAllAtivo = (req, res) => {

    Cardapio.find({ ativo: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cardapio por ativo true."
        });
      });
};

// Procura por entidade Cardapio onde o campo booleano impressora seja true
exports.findAllImpressora = (req, res) => {

    Cardapio.find({ impressora: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Cardapio por impressora true."
        });
      });
};
