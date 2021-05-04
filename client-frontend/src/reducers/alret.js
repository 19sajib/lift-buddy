import { toast } from "react-toastify";
import { SUCCESS, ERROR, WARN, INFO, LOGOUTALRET } from '../constants/actionTypes'
// eslint-disable-next-line
export default ( alret = [], action) => {
    switch(action.type) {
        case SUCCESS:
            toast.success(action?.data.message)
            return alret;
        case INFO:
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