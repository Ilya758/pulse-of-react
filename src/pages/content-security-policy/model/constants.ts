export const CSP_DIRECTIVES = [
  {
    defaultValue: ['self'],
    description: 'Controls which scripts can execute',
    name: 'script-src',
    options: ['self', 'unsafe-inline', 'unsafe-eval', 'none', 'https:', 'data:'],
  },
  {
    defaultValue: ['self'],
    description: 'Controls which stylesheets can be loaded',
    name: 'style-src',
    options: ['self', 'unsafe-inline', 'none', 'https:', 'data:'],
  },
  {
    defaultValue: ['self', 'data:', 'https:'],
    description: 'Controls which images can be loaded',
    name: 'img-src',
    options: ['self', 'data:', 'https:', 'http:', 'none'],
  },
  {
    defaultValue: ['self'],
    description: 'Controls which URLs can be loaded via fetch, XHR, WebSocket',
    name: 'connect-src',
    options: ['self', 'https:', 'wss:', 'none'],
  },
  {
    defaultValue: ['self'],
    description: 'Controls which fonts can be loaded',
    name: 'font-src',
    options: ['self', 'data:', 'https:', 'none'],
  },
  {
    defaultValue: ['none'],
    description: 'Controls which frames can be embedded',
    name: 'frame-src',
    options: ['self', 'none', 'https:'],
  },
];

export const CSP_MIDDLEWARE_CODE = `import { Request, Response, NextFunction } from 'express';
import { CSPPolicyBuilder } from './csp-policy-builder';

export interface CSPMiddlewareOptions {
  reportOnly?: boolean;
  reportUri?: string;
  environment?: 'development' | 'staging' | 'production';
  customDirectives?: Record<string, string[]>;
}

export const createCSPMiddleware = (options: CSPMiddlewareOptions = {}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const {
      reportOnly = false,
      reportUri,
      environment = 'production',
      customDirectives = {},
    } = options;

    // Build CSP policy based on environment
    let policyBuilder: CSPPolicyBuilder;

    switch (environment) {
      case 'development':
        policyBuilder = CSPPolicyBuilder.permissive();
        break;
      case 'staging':
        policyBuilder = CSPPolicyBuilder.strict();
        break;
      case 'production':
        policyBuilder = CSPPolicyBuilder.strict();
        break;
      default:
        policyBuilder = CSPPolicyBuilder.strict();
    }

    // Apply custom directives
    for (const [directive, sources] of Object.entries(customDirectives)) {
      policyBuilder.addDirective(directive as any, sources);
    }

    // Set report URI if provided
    if (reportUri) {
      policyBuilder.setReportUri(reportUri);
    }

    // Set report-only mode
    policyBuilder.setReportOnly(reportOnly);

    // Build and set the policy
    const policy = policyBuilder.build();
    const headerName = policyBuilder.buildObject().headerName;
    
    res.setHeader(headerName, policy);

    // Add nonce to response for inline scripts/styles if needed
    if (environment === 'development' || environment === 'staging') {
      const nonce = generateNonce();
      res.locals.cspNonce = nonce;
      
      // Update policy with nonce
      const noncePolicy = policyBuilder.addNonce(nonce).build();
      res.setHeader(headerName, noncePolicy);
    }

    next();
  };
};

// Node.js (Express) middleware usage example
export const cspMiddleware = createCSPMiddleware({
  environment: process.env.NODE_ENV as any,
  reportUri: process.env.CSP_REPORT_URI,
  reportOnly: process.env.NODE_ENV === 'development',
  customDirectives: {
    'script-src': ['self', 'https://cdn.jsdelivr.net'],
    'style-src': ['self', 'https://fonts.googleapis.com'],
  },
});

// Utility function to generate nonces
function generateNonce(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}`;
