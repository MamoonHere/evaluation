import axios from "axios";

const Network = async (request) => {
  try {
    const response = await axios({
      method: request.http,
      url: request.api,
      data: request.body,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default Network;
