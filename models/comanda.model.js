var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      data: Date,
      total: Number,
      cod_usuario: Number,
      cod_cartao_de_consumo: Number,
        codUsuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}, 
        codCartaoDeConsumo: {type: Schema.Types.ObjectId, ref: 'CartaoDeConsumo'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Comanda = mongoose.model("comanda", schema);
  return Comanda;
};
