// Functions for Navigation
function navigateTo(section) {
    document.querySelectorAll('section').forEach(function (sec) {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
}

// Enable Confirm Booking Button when fields are valid
document.getElementById('YourName').addEventListener('input', validateForm);
document.getElementById('EmailAddress').addEventListener('input', validateForm);
document.getElementById('MobileNumber').addEventListener('input', validateForm);
document.getElementById('VehicleNumber').addEventListener('input', validateForm);
document.getElementById('slot').addEventListener('change', validateForm);

function validateForm() {
    const name = document.getElementById('YourName').value.trim();
    const email = document.getElementById('EmailAddress').value.trim();
    const mobile = document.getElementById('MobileNumber').value.trim();
    const vehicleNumber = document.getElementById('VehicleNumber').value.trim();
    const slot = document.getElementById('slot').value.trim();
    const confirmBtn = document.getElementById('confirmBookingBtn');
    
    confirmBtn.disabled = !(name && email && mobile && vehicleNumber && slot);
}

// Show Booking Section
function showBookingSection() {
    document.getElementById('bookNowBtn').style.display = 'none'; // Hide "Book Now" button
    navigateTo('booking'); // Show booking section
}

// Handle Booking Confirmation
document.getElementById('confirmBookingBtn').addEventListener('click', function () {
    navigateTo('paymentConfirmation'); // Go to payment confirmation
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ''; // Clear existing QR code

    new QRCode(qrCodeContainer, {
        text: `Vehicle: ${document.getElementById('VehicleNumber').value}, Slot: ${document.getElementById('slot').value}`,
        width: 128,
        height: 128
    });
});

// Handle Confirm Payment
document.getElementById('confirmPaymentBtn').addEventListener('click', function () {
    navigateTo('receipt'); // Go to receipt section

    const vehicleNumber = document.getElementById('VehicleNumber').value;
    const slotSelected = document.getElementById('slot').value;
    
    // Extract price from slot value (e.g., "A1 (1200)")
    const priceMatch = slotSelected.match(/\((\d+)\)/);
    const amountPaid = priceMatch ? priceMatch[1] : "N/A";

    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerHTML = `
        <p>Vehicle Number: ${vehicleNumber}</p>
        <p>Slot Booked: ${slotSelected}</p>
        <p>Amount Paid: ₹${amountPaid}</p>
    `;
});

// Print Receipt functionality
document.getElementById('printReceiptBtn').addEventListener('click', function () {
    window.print();
});
