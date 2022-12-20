const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  from: { type: String },
  hosts: { type: [String] },
  task: { type: String },
  command: { type: String },
  result: { type: String },
  created_at: { type: Date },
  done_at: { type: Date },
  hosts_successful: { type: [String] },
  hosts_failed: { type: [String] },
  hosts_unreachable: { type: [String] },
});

module.exports = mongoose.model("action", actionSchema);