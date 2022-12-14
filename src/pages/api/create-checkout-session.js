const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items } = req.body;

  console.log(items);

  const transformedItems = items.map((item) => ({
    // description: item.description,
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 399,
            currency: 'usd',
          },
          display_name: 'Next-day',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free Delivery',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 12,
            },
            maximum: {
              unit: 'business_day',
              value: 15,
            },
          },
        },
      },
    ],
    // shipping_rates: ['shr_1LpkzYKkKDmvtKGawoi1TILd'],
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email: 'kevin',
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
