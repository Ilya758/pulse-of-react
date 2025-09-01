import { IconShield, IconShieldCheck, IconShieldX } from '@tabler/icons-react';

export const generateNonce = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const validateCSPPolicySyntax = (policy: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!policy.trim()) {
    errors.push('Policy cannot be empty');

    return { isValid: false, errors };
  }

  const directives = policy
    .split(';')
    .map((d) => d.trim())
    .filter((d) => d);

  for (const directive of directives) {
    if (!directive.includes(' ')) {
      errors.push(`Invalid directive format: "${directive}"`);
      continue;
    }

    const [directiveName, ...sources] = directive.split(' ');

    if (!directiveName) {
      errors.push(`Empty directive name in: "${directive}"`);
      continue;
    }

    if (sources.length === 0) {
      errors.push(`Directive "${directiveName}" has no sources`);
      continue;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
  switch (status) {
    case 'pass': {
      return <IconShieldCheck size={16} color="green" />;
    }

    case 'warning': {
      return <IconShield size={16} color="orange" />;
    }

    case 'fail': {
      return <IconShieldX size={16} color="red" />;
    }

    default: {
      return null;
    }
  }
};

export const updatePolicy = (directives: Record<string, string[]>, reportOnly: boolean) => {
  const directiveStrings: string[] = [];

  for (const [directive, sources] of Object.entries(directives)) {
    const sourcesArray = Array.isArray(sources) ? sources : [];
    if (sourcesArray.length > 0) {
      directiveStrings.push(`${directive} ${sourcesArray.join(' ')}`);
    }
  }

  if (reportOnly) {
    directiveStrings.push('report-uri /csp-violations');
  }

  return directiveStrings.join('; ');
};

export const testPolicy = (directives: Record<string, string[]>) => {
  const results: Array<{ directive: string; status: 'pass' | 'fail' | 'warning' }> = [];

  Object.entries(directives).forEach(([directive, sources]) => {
    const sourcesArray = Array.isArray(sources) ? sources : [];

    if (sourcesArray.includes('unsafe-inline') || sourcesArray.includes('unsafe-eval')) {
      results.push({ directive, status: 'warning' });
    } else if (sourcesArray.includes('none') && sourcesArray.length > 1) {
      results.push({ directive, status: 'fail' });
    } else if (sourcesArray.length === 0) {
      results.push({ directive, status: 'fail' });
    } else {
      results.push({ directive, status: 'pass' });
    }
  });

  return results;
};

export const applyTemplate = (template: 'strict' | 'permissive' | 'ecommerce') => {
  let newDirectives: Record<string, string[]> = {};

  switch (template) {
    case 'strict': {
      newDirectives = {
        'script-src': ['self'],
        'style-src': ['self'],
        'img-src': ['self', 'data:', 'https:'],
        'connect-src': ['self'],
        'font-src': ['self'],
        'frame-src': ['none'],
      };
      break;
    }
    case 'permissive': {
      newDirectives = {
        'script-src': ['self', 'unsafe-inline', 'unsafe-eval'],
        'style-src': ['self', 'unsafe-inline'],
        'img-src': ['self', 'data:', 'https:', 'http:'],
        'connect-src': ['self', 'https:', 'wss:'],
        'font-src': ['self', 'data:', 'https:'],
        'frame-src': ['self'],
      };
      break;
    }
    case 'ecommerce': {
      newDirectives = {
        'script-src': ['self', 'https://js.stripe.com', 'https://www.google-analytics.com'],
        'style-src': ['self', 'unsafe-inline'],
        'img-src': ['self', 'data:', 'https:', 'https://www.google-analytics.com'],
        'connect-src': ['self', 'https://api.stripe.com', 'https://www.google-analytics.com'],
        'font-src': ['self', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        'frame-src': ['self', 'https://js.stripe.com'],
      };
      break;
    }
  }

  const validatedDirectives: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(newDirectives)) {
    validatedDirectives[key] = Array.isArray(value) ? value : [];
  }

  return validatedDirectives;
};

