const { model, Schema } = require("mongoose");

const RoleSchema = new Schema({
  rol: {
    type: String,
    required: true,
  },
});

module.exports = model("Role", RoleSchema);
