const db = require("../../models");
const CartaoDeConsumo = db.cartoesdeConsumo;

validaCamposRequeridosCartaoDeConsumo = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.numero) {
        camposRequeridosEmpty.push("numero");
    }
    if (!req.body.dataAbertura) {
        camposRequeridosEmpty.push("dataAbertura");
    }
    if (!req.body.dataFechamento) {
        camposRequeridosEmpty.push("dataFechamento");
    }
    if (!req.body.cod_cliente) {
        camposRequeridosEmpty.push("cod_cliente");
    }
    if (!req.body.codCliente) {
        camposRequeridosEmpty.push("codCliente");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade CartaoDeConsumo
exports.create = (req, res) => {
    // Validate request
    if (!req.body.numero) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCartaoDeConsumo(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a CartaoDeConsumo
    const cartaoDeConsumo = new CartaoDeConsumo({
        numero: req.body.numero ? req.body.numero : null,
        dataAbertura: req.body.dataAbertura ? req.body.dataAbertura : null,
        dataFechamento: req.body.dataFechamento ? req.body.dataFechamento : null,
        cod_cliente: req.body.cod_cliente ? req.body.cod_cliente : null,
        codCliente: req.body.codCliente ? req.body.codCliente.id : null
    });

    // Save CartaoDeConsumo in the database
    cartaoDeConsumo
        .save(cartaoDeConsumo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar CartaoDeConsumo."
            });
        });
};

// Procura por todas as entidades do tipo CartaoDeConsumo
exports.findAll = (req, res) => {
    var condition = {};

    CartaoDeConsumo.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar CartaoDeConsumo."
        });
      });
};

// Busca a entidade CartaoDeConsumo por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    CartaoDeConsumo.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade CartaoDeConsumo com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade CartaoDeConsumo com o id " + id + "."
        });
      });
};

// Altera uma entidade CartaoDeConsumo
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosCartaoDeConsumo(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    CartaoDeConsumo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CartaoDeConsumo com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade CartaoDeConsumo com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade CartaoDeConsumo com o id " + id + "."
        });
      });
};

// Remove a entidade CartaoDeConsumo por id
exports.delete = (req, res) => {

    const id = req.params.id;

    CartaoDeConsumo.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade CartaoDeConsumo com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade CartaoDeConsumo com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade CartaoDeConsumo com o id " + id + "."
        });
      });
};
