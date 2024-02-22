function formatRupiah(amount: number): string {
    // Ensure the input is a positive number
    // amount = Math.abs(amount);

    // Format the whole number with commas as thousands separators
    const formattedAmountWithDecimal = amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

    // Convert the formatted string to an integer
    // const integerAmount = parseInt(formattedAmountWithDecimal.replace(/\D/g, ''));

    return formattedAmountWithDecimal.slice(0, -3)
}
export default formatRupiah;