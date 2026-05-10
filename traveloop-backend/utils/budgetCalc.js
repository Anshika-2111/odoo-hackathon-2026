// Helper to sum activity costs
const calculateTotalBudget = (activities) => {
    return activities.reduce((sum, activity) => sum + Number(activity.cost || 0), 0);
};
module.exports = { calculateTotalBudget };