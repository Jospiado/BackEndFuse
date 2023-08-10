var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      preco: Number,
      estoque: Number,
      ativo: Boolean,
      impressora: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cardapio = mongoose.model("cardapio", schema);
  return Cardapio;
};
