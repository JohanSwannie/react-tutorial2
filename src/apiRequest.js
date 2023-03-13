const apiRequest = async (
  url = "",
  operationsObject = null,
  errorMsg = null
) => {
  try {
    const response = await fetch(url, operationsObject);
    if (!response.ok) {
      throw Error("Please reload the application");
    }
  } catch (error) {
    errorMsg = error.message;
  } finally {
    return errorMsg;
  }
};

export default apiRequest;
