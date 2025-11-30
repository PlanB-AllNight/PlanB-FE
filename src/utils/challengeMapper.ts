export const mapMyChallenge = (challenge: any) => ({
    id: challenge.id,
    title: challenge.challenge_name,
    planType: challenge.plan_title,
    description: challenge.description,
    startDate: challenge.start_date,
    endDate: challenge.end_date,
    goalAmount: challenge.target_amount,
    goalPeriod: challenge.period_months,
    monthlySavings: challenge.monthly_required,
});