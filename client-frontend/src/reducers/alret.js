import { toast } from "react-toastify";
import { SUCCESS, ERROR, WARN, INFO, LOGOUTALRET,CREATPOST } from '../constants/actionTypes'
// eslint-disable-next-line
export default ( alret = [], action) => {
    switch(action.type) {
        case CREATPOST:
            toast.success("Your post created successfully")
            return alret;
        case SUCCESS:
            //console.log(action?.data);
            toast.success(action?.data.message)
            return alret;
        case INFO:
            //console.log(action?.data);
            toast.info(action?.data.message, { autoClose: 6000 })
            return alret;
        case ERROR:
            toast.error(action?.error.response.data.message);
            return alret;
        case WARN:
            toast.warn("Your post has been deleted.")
            return alret;
        case LOGOUTALRET:
            toast.warn("You have been logged out.")
            return alret;
            default:
            return alret;
    }
}