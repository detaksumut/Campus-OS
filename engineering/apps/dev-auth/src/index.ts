import Fastify from 'fastify';
import jwt from 'jsonwebtoken';

const fastify = Fastify({ logger: true });

const JWT_SECRET = 'dev-secret-key-do-not-use-in-prod';

fastify.post('/login', async (request, reply) => {
  const { username, role } = request.body as any;

  // Real JWT issuance for development
  const token = jwt.sign(
    { 
      userId: username,
      roles: [role],
      tenantId: 'campus-os-dev'
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token };
});

fastify.get('/.well-known/jwks.json', async (request, reply) => {
  // In a real dev-auth, we would expose JWKS for portal-api to verify
  return { keys: [] }; 
});

const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
    console.log('Dev Auth Server running on http://localhost:4000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
