const db = require("../../models");
const ItemComanda = db.itensComanda;

validaCamposRequeridosItemComanda = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.quantidade) {
        camposRequeridosEmpty.push("quantidade");
    }
    if (!req.body.unitario) {
        camposRequeridosEmpty.push("unitario");
    }
    if (!req.body.cancelado) {
        camposRequeridosEmpty.push("cancelado");
    }
    if (!req.body.cod_cardapio) {
        camposRequeridosEmpty.push("cod_cardapio");
    }
    if (!req.body.cod_comandas) {
        camposRequeridosEmpty.push("cod_comandas");
    }
    if (!req.body.codcardapio) {
        camposRequeridosEmpty.push("codcardapio");
    }
    if (!req.body.codcomandas) {
        camposRequeridosEmpty.push("codcomandas");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade ItemComanda
exports.create = (req, res) => {
    // Validate request
    if (!req.body.quantidade) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosItemComanda(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a ItemComanda
    const itemComanda = new ItemComanda({
        quantidade: req.body.quantidade ? req.body.quantidade : null,
        unitario: req.body.unitario ? req.body.unitario : null,
        cancelado: req.body.cancelado ? req.body.cancelado : null,
        cod_cardapio: req.body.cod_cardapio ? req.body.cod_cardapio : null,
        cod_comandas: req.body.cod_comandas ? req.body.cod_comandas : null,
        codcardapio: req.body.codcardapio ? req.body.codcardapio.id : null,
        codcomandas: req.body.codcomandas ? req.body.codcomandas.id : null
    });

    // Save ItemComanda in the database
    itemComanda
        .save(itemComanda)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar ItemComanda."
            });
        });
};

// Procura por todas as entidades do tipo ItemComanda
exports.findAll = (req, res) => {
    var condition = {};

    ItemComanda.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar ItemComanda."
        });
      });
};

// Busca a entidade ItemComanda por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    ItemComanda.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade ItemComanda com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade ItemComanda com o id " + id + "."
        });
      });
};

// Altera uma entidade ItemComanda
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosItemComanda(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    ItemComanda.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ItemComanda com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade ItemComanda com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade ItemComanda com o id " + id + "."
        });
      });
};

// Remove a entidade ItemComanda por id
exports.delete = (req, res) => {

    const id = req.params.id;

    ItemComanda.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade ItemComanda com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade ItemComanda com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade ItemComanda com o id " + id + "."
        });
      });
};

// Procura por entidade ItemComanda onde o campo booleano cancelado seja true
exports.findAllCancelado = (req, res) => {

    ItemComanda.find({ cancelado: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar ItemComanda por cancelado true."
        });
      });
};
