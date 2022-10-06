module.exports = {
  images: {
    domains: ['links.papareact.com', 'fakestoreapi.com'],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },

  async rewrites() {
    return [
      {
        source: '/api/create-checkout-session',
        destination:
          'https://next-server-eta.vercel.app/create-checkout-session',
      },
    ];
  },
};
