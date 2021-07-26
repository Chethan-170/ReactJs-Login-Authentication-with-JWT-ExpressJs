import Axios from "axios"
import config from "src/config";

export default Axios.create({
    baseURL: window.location.origin.replace(':'+config.CLIENT_PORT,':'+config.SERVER_PORT)
});