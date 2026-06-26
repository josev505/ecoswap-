import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://idevgthrllzbtjvowobb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Uq5qsr79p-ukURrVD_5jgw__Tx4fczD';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function registrarMetrica(
  email: string,
  evento: string,
  exitoso: boolean
) {
  await supabase.from('metricas').insert({
    email,
    evento,
    exitoso,
    fecha_hora: new Date().toISOString(),
  });
}