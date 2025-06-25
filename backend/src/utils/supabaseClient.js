const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Les variables d\'environnement SUPABASE_URL et SUPABASE_SERVICE_KEY sont requises');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase }; 