import Fastify from 'fastify';
import jwt from 'jsonwebtoken';
import { ApplicationContext } from '@campus-os/application-kernel';

const fastify = Fastify({ logger: true });

// Dummy Kernel instance for scaffolding
// import { CommandBus, QueryBus, RegistryRuntime } from '@campus-os/application-kernel';

// Exception Mapper Middleware
fastify.setErrorHandler((error, request, reply) => {
  if ((error as any).__isAuthorizationResult) {
    const authResult = error as any;
    if (authResult.status === 'UNAUTHENTICATED') {
      return reply.status(401).send({ error: authResult.message });
    }
    if (authResult.status === 'INVALID_CONTEXT') {
      return reply.status(400).send({ error: authResult.message });
    }
    return reply.status(403).send({ error: authResult.status, message: authResult.message });
  }
  
  reply.status(500).send({ error: 'Internal Server Error', details: error.message });
});

fastify.post('/api/commands', async (request, reply) => {
  const authHeader = request.headers.authorization;
  let identity;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.decode(token) as any;
      identity = {
        userId: decoded.userId,
        roles: decoded.roles
      };
    } catch (e) {
      // Invalid token
    }
  }

  const contextData = {
    identity,
    correlationId: request.id
  };

  return ApplicationContext.run(contextData, async () => {
    // const commandBus = fastify.di.resolve('CommandBus');
    // return await commandBus.execute(request.body as ICommand);
    
    // Mock response for scaffold
    return { success: true, message: 'Command executed in context' };
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    console.log('Portal API running on http://localhost:8080');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
