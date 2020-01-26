export const CatchRequest = async (Request) => {
  try {
    const res = await Request();
    return res.data
  } catch (error) {
    const req = error.response.request;
    return { data: req.data, "code": req.status, "status": "error", "message": req.statusText };
  }
};