import "dotenv/config";

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const port = process.env.PORT || 5000 ;
const clientPort =  process.env.CLIENT_PORT || '5173';

const salt = process.env.SALT_ROUNDS

const jsonwebtokenUser = process.env.JWT_USER_SECRET
const jsonwebtokenAdmin = process.env.JWT_ADMIN_SECRET

export{uri, dbName, port, salt, clientPort, jsonwebtokenUser, jsonwebtokenAdmin};

