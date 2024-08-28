const { Schema, model } = require('mongoose');

const TradeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tradingStrategy: { type: String, required: true },
  tradingPlan: { type: String, required: true },
  amountTraded: { type: Number, required: true },
  riskManagement: { type: String, required: true },
  entryPoint: { type: String, required: true },
  exitPoint: { type: String, required: true },
  indicatorsUsed: { type: [String], required: true },
  timeFrame: { type: String, required: true },
  screenshot: { type: String },
  tradeDate: { type: Date, required: true },
  screenshotUrl: { type: String, required: true },
});

module.exports = model('Trade', TradeSchema);
