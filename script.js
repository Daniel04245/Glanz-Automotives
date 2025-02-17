document.addEventListener("DOMContentLoaded", function () {
    // Contact Info Page Handler
    const contactInfoForm = document.querySelector(".user-info-form form");
    if (contactInfoForm) {
        contactInfoForm.addEventListener("submit", function (event) {
            event.preventDefault();
            
            // Store contact info
            const preferredName = document.getElementById("preferredName").value;
            const lastName = document.getElementById("lastName").value;
            
            console.log("Storing names:", { preferredName, lastName });

            sessionStorage.setItem("preferredName", preferredName);
            sessionStorage.setItem("lastName", lastName);
            sessionStorage.setItem("firstName", document.getElementById("firstName").value);
            sessionStorage.setItem("email", document.getElementById("email").value);
            sessionStorage.setItem("phoneNumber", document.getElementById("phoneNumber").value);
            
            window.location.href = "booking.html";
        });
    }

    // Booking Page Handler
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        window.validateForm = function() {
            let date = document.getElementById("date").value;
            let time = document.getElementById("time").value;
            let service = document.getElementById("service").value;
            let advisor = document.getElementById("advisor").value;

            if (!date || !time || service === "first" || advisor === "first") {
                alert("Please fill out all fields before submitting.");
                return false;
            }

            let selectedTime = time.split(":");
            let hour = parseInt(selectedTime[0], 10);

            if (hour < 8 || hour >= 20) {
                alert("The company is open from 8:00 AM to 8:00 PM. Please select a valid time.");
                return false;
            }

            // Store booking details in sessionStorage
            sessionStorage.setItem("bookingDate", date);
            sessionStorage.setItem("bookingTime", time);
            sessionStorage.setItem("bookingService", service);
            sessionStorage.setItem("bookingAdvisor", advisor);

            // Redirect to confirmation page
            window.location.href = "confirmation.html";
        };
    }

    // Confirmation Page Handler
    if (window.location.pathname.includes("confirmation.html")) {
        // Get stored names
        const preferredName = sessionStorage.getItem("preferredName");
        const lastName = sessionStorage.getItem("lastName");
        
        console.log("Retrieved names:", { preferredName, lastName });

        // Update thank you message
        const thankYouMessage = document.querySelector(".thank-you-message p");
        if (thankYouMessage && preferredName && lastName) {
            thankYouMessage.innerHTML = `<strong>${preferredName} ${lastName}</strong>, thank you for booking an appointment with us. We look forward to providing you with an exceptional experience!`;
        }

        // Display booking details
        const dateSpan = document.getElementById("booking-date");
        const timeSpan = document.getElementById("booking-time");
        const serviceSpan = document.getElementById("booking-service");
        const advisorSpan = document.getElementById("booking-advisor");

        if (dateSpan) dateSpan.textContent = formatDate(sessionStorage.getItem("bookingDate"));
        if (timeSpan) timeSpan.textContent = formatTime(sessionStorage.getItem("bookingTime"));
        if (serviceSpan) serviceSpan.textContent = sessionStorage.getItem("bookingService");
        if (advisorSpan) advisorSpan.textContent = sessionStorage.getItem("bookingAdvisor");
    }
});

// Helper function to format date
function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Helper function to format time
function formatTime(timeString) {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours, 10));
    time.setMinutes(parseInt(minutes, 10));
    return time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });
}
