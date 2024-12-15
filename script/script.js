// Redirect to the form page with the selected plan in the query string
function redirectToForm(plan) {
    const formPageUrl = 'form.html';
    const queryString = `?plan=${encodeURIComponent(plan)}`;
    window.location.href = formPageUrl + queryString;
  }
  
// Automatically pre-select the plan on the form page
document.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get('plan');
if (selectedPlan) {
    const planDropdown = document.getElementById('plan');
    if (planDropdown) {
    planDropdown.value = selectedPlan;
    }
}
});
  