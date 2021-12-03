const { Pool, Client } = require('pg')
// const pool = new Pool({
// 	user: 'kirium',
// 	host: 'localhost',
// 	database: 'sms_api',
// 	password: 'kirium',
// 	port: 5432,
// })


// pool.query('SELECT NOW()', (err, res) => {
// 	console.log(err, res)
// 	pool.end()
// })
let mainPool = null;
function createPool(){
  	const pool = new Pool({
		user: 'postgres',
		host: 'localhost',
		database: 'api_sms',
		password: 'kirium',
		port: 5434
  	});
  	return pool;
}

function getPool(){
  if(!mainPool){
    mainPool = createPool();
  }
  return mainPool;
}

// export default { getPool };


module.exports = {getPool};
