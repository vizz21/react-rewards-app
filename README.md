<h1>
  Customer Rewards Application
</h1>
   <h2> Project Overview </h2>

This is a React-based web application that allows users to view customer transactions, filter them by month and year, and calculate reward points based on the purchase amount. 

<h2>Features </h2>

Display a list of customers and their transactions.

Filter transactions by Month and Year for better insights.

Calculate and display reward points for each transaction in real-time.

Display total monthly reward points for each customer.

empty transactions with eror msg


<h2> Application Details </h2>

The application consists of the following components:
<ul>
  <li>App.jsx - Main component handling customer selection, transaction filtering, and rendering.</li>
  <li>rewardService.js - Contains business logic for calculating reward points.</li>
  <li>dateConstants.js - Holds static month and year data for easy dropdown population.</li>
</ul>

<h2>Reward Calculation Logic </h2>

$1 spent between $50 and $100 → 1 Point

$1 spent over $100 → 2 Points

<b>Example:<b>

A $120 purchase: 2x$20 + 1x$50 = 90 points


<h2> Screenshot </h2>

<h3>Starting Page with all customers</h3>

![image](https://github.com/user-attachments/assets/901f87b3-a065-4ce6-b0c4-8cea8c04498f)


<h3>Individual customer with month and year filter</h3>

![image](https://github.com/user-attachments/assets/4bb73b64-a422-4179-a158-a2155d00e5a1)



<h3>error msg when no transaction for that particular month</h3>

![image](https://github.com/user-attachments/assets/25c7ec23-4968-4e0b-9ded-540fb4e4466a)



