const db = require("../../models");
const Comanda = db.comandas;

validaCamposRequeridosComanda = (req) => {
    const camposRequeridosEmpty = new Array();
    if (!req.body.data) {
        camposRequeridosEmpty.push("data");
    }
    if (!req.body.total) {
        camposRequeridosEmpty.push("total");
    }
    if (!req.body.cod_usuario) {
        camposRequeridosEmpty.push("cod_usuario");
    }
    if (!req.body.cod_cartao_de_consumo) {
        camposRequeridosEmpty.push("cod_cartao_de_consumo");
    }
    if (!req.body.codUsuario) {
        camposRequeridosEmpty.push("codUsuario");
    }
    if (!req.body.codCartaoDeConsumo) {
        camposRequeridosEmpty.push("codCartaoDeConsumo");
    }
    return camposRequeridosEmpty;
}

// Cria e salva um novo documento para a entidade Comanda
exports.create = (req, res) => {
    // Validate request
    if (!req.body.data) {
        res.status(400).send({ message: "Conteúdo não pode ser vazio!" });
        return;
    }

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosComanda(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    // Create a Comanda
    const comanda = new Comanda({
        data: req.body.data ? req.body.data : null,
        total: req.body.total ? req.body.total : null,
        cod_usuario: req.body.cod_usuario ? req.body.cod_usuario : null,
        cod_cartao_de_consumo: req.body.cod_cartao_de_consumo ? req.body.cod_cartao_de_consumo : null,
        codUsuario: req.body.codUsuario ? req.body.codUsuario.id : null,
        codCartaoDeConsumo: req.body.codCartaoDeConsumo ? req.body.codCartaoDeConsumo.id : null
    });

    // Save Comanda in the database
    comanda
        .save(comanda)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Ocorreu um erro de servidor ao tentar salvar Comanda."
            });
        });
};

// Procura por todas as entidades do tipo Comanda
exports.findAll = (req, res) => {
    var condition = {};

    Comanda.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro desconhecido ocorreu ao buscar Comanda."
        });
      });
};

// Busca a entidade Comanda por id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Comanda.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "A entidade Comanda com id " + id + " não encontrada!" });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao buscar a entidade Comanda com o id " + id + "."
        });
      });
};

// Altera uma entidade Comanda
exports.update = (req, res) => {

    // Validate required fields
    const camposRequeridosEmpty = validaCamposRequeridosComanda(req);
    if (camposRequeridosEmpty.length > 0) {
        res.status(400).send({ message: "Campos requeridos ("+camposRequeridosEmpty.join(",") + ") não podem ser vazios!" });
        return;
    }

    const id = req.params.id;

    Comanda.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Comanda com id ${id} não encontrada, por isso não pode ser atualizada!`
          });
        } else res.send({ message: `A entidade Comanda com id ${id} foi alterada com sucesso.` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao alterar a entidade Comanda com o id " + id + "."
        });
      });
};

// Remove a entidade Comanda por id
exports.delete = (req, res) => {

    const id = req.params.id;

    Comanda.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `A entidade Comanda com id ${id} não encontrada, por isso não pode ser excluida!`
          });
        } else {
          res.send({
            message: `A entidade Comanda com id ${id} foi excluída com sucesso.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro desconhecido ocorreu ao excluir a entidade Comanda com o id " + id + "."
        });
      });
};
