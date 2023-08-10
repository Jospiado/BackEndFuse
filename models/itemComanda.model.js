var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      quantidade: Number,
      unitario: Number,
      cancelado: Boolean,
      cod_cardapio: Number,
      cod_comandas: Number,
        codcardapio: {type: Schema.Types.ObjectId, ref: 'Cardapio'}, 
        codcomandas: {type: Schema.Types.ObjectId, ref: 'Comanda'}, 
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ItemComanda = mongoose.model("itemComanda", schema);
  return ItemComanda;
};
