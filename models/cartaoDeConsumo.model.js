var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      numero: String,
      dataAbertura: Date,
      dataFechamento: Date,
      cod_cliente: Number,
        codCliente: {type: Schema.Types.ObjectId, ref: 'Cliente'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const CartaoDeConsumo = mongoose.model("cartaoDeConsumo", schema);
  return CartaoDeConsumo;
};
