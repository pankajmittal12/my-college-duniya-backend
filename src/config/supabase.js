const supabase = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const db = supabase.createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

if(!db){
    console.log("connect Unsuccessfully!");
} else {
    console.log("connect Successfully!");
}

module.exports = db;