const { AsyncParser, Parser } = require('json2csv');


const generate = (fields, data) => {
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    return csv
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  generate
}