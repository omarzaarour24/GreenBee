import axios from "axios";
import { env } from '$env/dynamic/public';

//Needed to communicate with Supabase
axios.defaults.headers.common['apiKey'] = env.PUBLIC_SUPABASE_ANON_KEY;

class ExampleApi { 
    Get(): Promise<any> {
        return axios
          .get(`${env.PUBLIC_SUPABASE_URL}/rest/v1/company`)
          .then((response) => response.data)
          .catch((_) => console.error(_));
      }
}

export default new ExampleApi();
