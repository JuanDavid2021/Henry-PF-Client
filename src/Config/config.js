// configuration, credentials, etc 
import axios from 'axios';


const Config = {
  apiUrl: axios.create({
    baseURL: process.env.API_URL
  }),
  // demas credenciales / configuraciones globales
};


export default Config;