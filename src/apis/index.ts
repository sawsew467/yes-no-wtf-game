import axios from "axios";

export const getAnswerAPI = () =>
  axios.get("https://yesno.wtf/api");
