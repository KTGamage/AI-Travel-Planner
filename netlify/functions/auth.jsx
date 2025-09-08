exports.handler = async (event, context) => {
  // Handle OAuth redirect here
  return {
    statusCode: 302,
    headers: {
      Location: `https://goplan-ai-fe04d1.netlify.app/?token=${event.queryStringParameters.code}`
    }
  };
};