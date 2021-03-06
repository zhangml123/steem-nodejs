var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename)
var config = require("../config");
var db = {}

var sequelize = new Sequelize(config.database,config.username,config.password,config);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  fs.readdirSync(__dirname)
  .filter((file)=>{
  	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file)=>{
  	var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  })
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
})

//db.sequelize = sequelize;
//db.Sequelize = Sequelize;
module.exports = db;


