export default function formatCurrency(amount) {
    return '$' + Math.floor(amount).toLocaleString();
}