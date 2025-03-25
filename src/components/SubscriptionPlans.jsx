import React from 'react';

const subscriptionData = [
  {
    title: 'Annual Charge',
    content: [
      'Rs. 18,000 per acre.'
    ]
  },
  {
    title: 'Early Bird Discount',
    content: [
      'Subscribe before 1st June 2025 and get 10% off.'
    ]
  },
  {
    title: 'Bulk Discount',
    content: [
      'Additional 5% discount when subscribing for 3 acres or more.'
    ]
  },
  {
    title: 'Payment Terms',
    content: [
      '25% of the total subscription amount is payable on the day of subscription.',
      'The remaining amount will be direct debited from your provided bank account or chosen payment method in equal monthly instalments for the rest of the year.'
    ]
  }
];

const SubscriptionPlans = () => {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Annual Subscription Plans</h2>
        <p className="text-gray-600">EzyKheti Agri Services Pvt Ltd offers an Annual Subscription Plan that provides unlimited access to all pay-as-you-go services at a fixed cost, ensuring affordability and seamless farming operations throughout the year.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {subscriptionData.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow p-6 text-left">
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {item.content.map((point, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
