 // Functions for Navigation
 function navigateTo(section) {
    document.querySelectorAll('section').forEach(function (sec) {
        sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
}

// Enable Confirm Booking Button when vehicle number and slot are selected
document.getElementById('Your Name').addEventListener('input', validateForm);
document.getElementById('Email Address').addEventListener('input', validateForm);
document.getElementById('Mobile Number').addEventListener('input', validateForm);

document.getElementById('vehicleNumber').addEventListener('input', validateForm);
document.getElementById('slot').addEventListener('change', validateForm);

function validateForm() {
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const slot = document.getElementById('slot').value;
    const confirmBtn = document.getElementById('confirmBookingBtn');
    confirmBtn.disabled = !vehicleNumber || !slot;
}

// Show Booking Section
function showBookingSection() {
    document.getElementById('bookNowBtn').style.display = 'none';  // Hide the "Book Now" button
    navigateTo('booking');  // Go to the booking section
}

// Handle Booking Confirmation
document.getElementById('confirmBookingBtn').addEventListener('click', function() {
    navigateTo('paymentConfirmation'); // Go to payment confirmation section
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = ''; // Clear any existing QR code
    new QRCode(qrCodeContainer, {
        text: `Vehicle: ${document.getElementById('vehicleNumber').value}, Slot: ${document.getElementById('slot').value}`,
        width: 128,
        height: 128
    });
});

// Handle Confirm Payment
document.getElementById('confirmPaymentBtn').addEventListener('click', function() {
    navigateTo('receipt'); // Go to receipt section after payment confirmation
    const receiptContent = document.getElementById('receiptContent');
    const slotSelected = document.getElementById('slot').value;
    receiptContent.innerHTML = 
        `<p>Vehicle Number: ${document.getElementById('vehicleNumber').value}</p>
        <p>Slot Booked: ${slotSelected}</p>
        <p>Amount Paid: ₹${slotSelected === 'A1' ? 1500 : slotSelected === 'B1' ? 1200 : 950}</p>`;
});

// Print Receipt functionality
document.getElementById('printReceiptBtn').addEventListener('click', function() {
    window.print();
});
