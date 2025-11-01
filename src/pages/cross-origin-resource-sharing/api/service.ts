import { MockServerConfig, MockServerRequest, MockServerResponse } from '../model';

export const mockServer = (
  { allowedOrigin, allowedMethods, allowedHeaders, allowCredentials, maxAge }: MockServerConfig,
  { origin, method, headers }: MockServerRequest,
): MockServerResponse => {
  const responseHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const isOriginAllowed = allowedOrigin === '*' || allowedOrigin === origin;

  if (isOriginAllowed) {
    responseHeaders['Access-Control-Allow-Origin'] = allowedOrigin;
  }

  if (method === 'OPTIONS') {
    if (isOriginAllowed) {
      responseHeaders['Access-Control-Allow-Methods'] = allowedMethods.join(', ');
      responseHeaders['Access-Control-Allow-Headers'] = allowedHeaders.join(', ');
      if (allowCredentials) {
        responseHeaders['Access-Control-Allow-Credentials'] = 'true';
      }
      if (maxAge) {
        responseHeaders['Access-Control-Max-Age'] = maxAge;
      }
    }
    return {
      body: null,
      headers: responseHeaders,
      status: 204,
      statusText: 'No Content',
    };
  }
  const isMethodAllowed = allowedMethods.includes(method);
  const hasDisallowedHeaders = Object.keys(headers).some(
    (h) =>
      !(
        ['content-type'].includes(h.toLowerCase())
        || allowedHeaders.map((ah: string) => ah.toLowerCase()).includes(h.toLowerCase())
      ),
  );

  if (!isOriginAllowed) {
    return {
      error:
        "CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
    };
  }

  if (!isMethodAllowed) {
    return { error: `CORS policy: Method ${method} is not allowed.` };
  }

  if (hasDisallowedHeaders) {
    return {
      error: `CORS policy: Request header field ${Object.keys(headers).find(
        (h) => !allowedHeaders.includes(h),
      )} is not allowed by Access-Control-Allow-Headers in preflight response.`,
    };
  }

  return {
    body: { data: 'some secret data', message: 'Request successful!' },
    headers: responseHeaders,
    status: 200,
    statusText: 'OK',
  };
};
