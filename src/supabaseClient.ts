import {createClient} from "@supabase/supabase-js";

const supabaseUrl = "https://fkkiavhghyoqaimjbiaq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTE0Nzc1MCwiZXhwIjoxOTU0NzIzNzUwfQ.p4V7ae24AmAsDbajuw_RPIFiWiiMXxxYyHN2gZ4lwic";

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
