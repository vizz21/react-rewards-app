//reward points
//A customer receives 2 points 
// for every dollar spent over $100 in each transaction, 
// plus 1 point for every dollar spent between $50 and $100 in each transaction. 

//(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points)



export const calculateRewardPoints = (amount) => {
  if (amount <= 50) return 0;
  if (amount <= 100) return amount - 50;
  return (amount - 100) * 2 + 50;
};


//by month and year

export const calculateMonthlyPoints = (transactions) => {
  const monthlyPoints = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleString('default', { month: 'short' }) + '-' + date.getFullYear();

    if (!monthlyPoints[monthYear]) {
      monthlyPoints[monthYear] = 0;
    }

    monthlyPoints[monthYear] += calculateRewardPoints(transaction.amount);
  });

  return monthlyPoints;
};
