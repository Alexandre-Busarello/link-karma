import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@linkkarma/auth';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    user_metadata?: any;
  };
}

/**
 * Middleware to protect API routes with authentication
 */
export async function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse> | NextResponse,
  options: {
    requireAuth?: boolean;
    allowedRoles?: string[];
  } = {}
) {
  return async (req: NextRequest) => {
    const { requireAuth = true, allowedRoles = [] } = options;

    try {
      // Get the authorization header
      const authHeader = req.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        if (requireAuth) {
          return NextResponse.json(
            { error: 'Missing or invalid authorization header' },
            { status: 401 }
          );
        }
        return handler(req as AuthenticatedRequest);
      }

      // Extract the token
      const token = authHeader.substring(7);

      // Verify the token with Supabase
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        if (requireAuth) {
          return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 401 }
          );
        }
        return handler(req as AuthenticatedRequest);
      }

      // Check roles if specified
      if (allowedRoles.length > 0) {
        const userRole = user.user_metadata?.role || 'user';
        if (!allowedRoles.includes(userRole)) {
          return NextResponse.json(
            { error: 'Insufficient permissions' },
            { status: 403 }
          );
        }
      }

      // Add user to request
      (req as AuthenticatedRequest).user = {
        id: user.id,
        email: user.email || '',
        user_metadata: user.user_metadata,
      };

      return handler(req as AuthenticatedRequest);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      );
    }
  };
}

/**
 * Helper function to get user from request in API routes
 */
export function getUser(req: AuthenticatedRequest) {
  return req.user || null;
}

/**
 * Helper function to require authentication in API routes
 */
export function requireAuth(req: AuthenticatedRequest) {
  if (!req.user) {
    throw new Error('Authentication required');
  }
  return req.user;
}

export default withAuth;
