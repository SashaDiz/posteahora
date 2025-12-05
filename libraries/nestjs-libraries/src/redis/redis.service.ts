import { Redis } from 'ioredis';

// Create a mock Redis implementation for testing environments
class MockRedis {
  private data: Map<string, any> = new Map();
  private watchedKeys: Set<string> = new Set();

  async get(key: string) {
    return this.data.get(key);
  }

  async set(key: string, value: any) {
    this.data.set(key, value);
    return 'OK';
  }

  async del(key: string) {
    this.data.delete(key);
    return 1;
  }

  async watch(key: string) {
    this.watchedKeys.add(key);
    return 'OK';
  }

  async expire(key: string, seconds: number) {
    // Mock implementation - in real Redis this sets TTL
    return 1;
  }

  multi() {
    const commands: Array<[string, any[]]> = [];
    const self = this;
    const chainable = {
      set: (key: string, value: any) => {
        commands.push(['set', [key, value]]);
        return chainable;
      },
      expire: (key: string, seconds: number) => {
        commands.push(['expire', [key, seconds]]);
        return chainable;
      },
      exec: async () => {
        // Execute all commands
        for (const [cmd, args] of commands) {
          if (cmd === 'set') {
            await self.set(args[0], args[1]);
          } else if (cmd === 'expire') {
            await self.expire(args[0], args[1]);
          }
        }
        return commands.map(() => ['OK', null]);
      },
    };
    return chainable;
  }

  // Add other Redis methods as needed for your tests
}

// Helper function to create Redis instance with proper error handling
function createRedisInstance(): Redis {
  if (!process.env.REDIS_URL) {
    // Return MockRedis but cast to Redis for type compatibility
    // In production, REDIS_URL should always be set
    return new MockRedis() as unknown as Redis;
  }

  let redisUrl = process.env.REDIS_URL;
  
  // Parse URL to determine if TLS is needed
  let tls: any = undefined;
  const urlObj = new URL(redisUrl);
  
  // Enable TLS for:
  // 1. rediss:// URLs (Redis with SSL)
  // 2. Upstash Redis (contains .upstash.io) - convert redis:// to rediss://
  const isUpstash = urlObj.hostname.includes('.upstash.io');
  const needsTLS = urlObj.protocol === 'rediss:' || isUpstash || redisUrl.includes('rediss://');
  
  // Convert redis:// to rediss:// for Upstash if needed
  if (isUpstash && urlObj.protocol === 'redis:') {
    redisUrl = redisUrl.replace('redis://', 'rediss://');
  }
  
  if (needsTLS) {
    tls = {
      rejectUnauthorized: true, // Verify SSL certificate
    };
  }

  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
    connectTimeout: 10000,
    retryStrategy: (times) => {
      // Exponential backoff: wait up to 3 seconds
      const delay = Math.min(times * 50, 3000);
      return delay;
    },
    enableReadyCheck: true,
    lazyConnect: false,
    ...(tls && { tls }), // Add TLS config if needed
  });

  // Handle connection errors gracefully
  let lastErrorTime = 0;
  const ERROR_THROTTLE_MS = 5000; // Only log errors every 5 seconds

  redis.on('error', (error: Error & { code?: string }) => {
    const now = Date.now();
    
    // Suppress ECONNRESET errors (they're usually transient and handled by retry logic)
    if (error.message.includes('ECONNRESET') || error.code === 'ECONNRESET') {
      // Only log if it's been more than 5 seconds since last error
      if (now - lastErrorTime > ERROR_THROTTLE_MS) {
        console.warn('[Redis] Connection reset (this is usually harmless):', error.message);
        lastErrorTime = now;
      }
      return;
    }

    // Log other errors normally
    if (now - lastErrorTime > ERROR_THROTTLE_MS) {
      console.error('[Redis] Connection error:', error.message);
      lastErrorTime = now;
    }
  });

  redis.on('connect', () => {
    console.log('[Redis] Connected successfully');
  });

  redis.on('ready', () => {
    console.log('[Redis] Ready to accept commands');
  });

  redis.on('close', () => {
    console.log('[Redis] Connection closed');
  });

  redis.on('reconnecting', (delay: number) => {
    console.log(`[Redis] Reconnecting in ${delay}ms...`);
  });

  return redis;
}

// Use real Redis if REDIS_URL is defined, otherwise use MockRedis
// Type assertion: When REDIS_URL is set, this is always a real Redis instance
export const ioRedis: Redis = createRedisInstance();
