document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const successMessage = document.getElementById('successMessage');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error states
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Collect form data
            const formData = collectFormData();
            
            // Store data (since we can't use a backend, we'll use localStorage)
            storeSubmission(formData);
            
            // Show success message
            showSuccess();
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Required fields validation
        const requiredFields = ['name', 'eventTitle', 'description', 'category', 'duration'];
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation (if provided)
        const emailField = document.getElementById('email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.add('error');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
    }

    function clearErrors() {
        const errorGroups = document.querySelectorAll('.form-group.error');
        errorGroups.forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    }

    function collectFormData() {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            eventTitle: document.getElementById('eventTitle').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            duration: document.getElementById('duration').value,
            participants: document.getElementById('participants').value,
            resources: document.getElementById('resources').value,
            timestamp: new Date().toISOString()
        };
    }

    function storeSubmission(data) {
        // Get existing submissions
        let submissions = [];
        try {
            submissions = JSON.parse(localStorage.getItem('engineerDaySubmissions') || '[]');
        } catch (e) {
            submissions = [];
        }
        
        // Add new submission
        submissions.push(data);
        
        // Store back to localStorage
        localStorage.setItem('engineerDaySubmissions', JSON.stringify(submissions));
        
        console.log('Submission stored:', data);
    }

    function showSuccess() {
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form after showing success
        setTimeout(() => {
            form.reset();
        }, 1000);
        
        // Option to submit another idea
        setTimeout(() => {
            const submitAnotherBtn = document.createElement('button');
            submitAnotherBtn.textContent = 'Submit Another Idea';
            submitAnotherBtn.className = 'submit-btn';
            submitAnotherBtn.style.marginTop = '20px';
            submitAnotherBtn.onclick = function() {
                form.style.display = 'block';
                successMessage.style.display = 'none';
            };
            successMessage.appendChild(submitAnotherBtn);
        }, 2000);
    }

    // Add smooth scrolling for better UX
    function smoothScroll(target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Auto-resize textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});

// Function to view submitted ideas (for admin/organizers)
function viewSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('engineerDaySubmissions') || '[]');
    if (submissions.length === 0) {
        alert('No submissions yet!');
        return;
    }
    
    let output = 'ENGINEER DAY EVENT SUBMISSIONS:\n\n';
    submissions.forEach((submission, index) => {
        output += `${index + 1}. ${submission.eventTitle}\n`;
        output += `   By: ${submission.name}\n`;
        if (submission.email) {
            output += `   Email: ${submission.email}\n`;
        }
        output += `   Category: ${submission.category}\n`;
        output += `   Duration: ${submission.duration}\n`;
        if (submission.participants) {
            output += `   Expected Participants: ${submission.participants}\n`;
        }
        output += `   Description: ${submission.description}\n`;
        if (submission.resources) {
            output += `   Resources: ${submission.resources}\n`;
        }
        output += `   Submitted: ${new Date(submission.timestamp).toLocaleString()}\n\n`;
    });
    
    // Create a new window to display submissions
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
            <head>
                <title>Engineer Day Submissions (${submissions.length} total)</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                        padding: 20px; 
                        line-height: 1.6;
                    }
                    pre { 
                        white-space: pre-wrap; 
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        border: 1px solid #dee2e6;
                    }
                    h2 { color: #4CAF50; }
                    .print-btn {
                        background: #4CAF50;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 6px;
                        cursor: pointer;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h2>Engineer Day Event Submissions (${submissions.length} total)</h2>
                <button class="print-btn" onclick="window.print()">Print/Save as PDF</button>
                <pre>${output}</pre>
            </body>
        </html>
    `);
}

// Function to export submissions as CSV
function exportSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('engineerDaySubmissions') || '[]');
    if (submissions.length === 0) {
        alert('No submissions to export!');
        return;
    }
    
    // CSV headers
    const headers = ['Name', 'Email', 'Event Title', 'Description', 'Category', 'Duration', 'Participants', 'Resources', 'Submitted Date'];
    
    // Convert submissions to CSV format
    const csvContent = [
        headers.join(','),
        ...submissions.map(submission => [
            `"${submission.name}"`,
            `"${submission.email || ''}"`,
            `"${submission.eventTitle}"`,
            `"${submission.description.replace(/"/g, '""')}"`,
            `"${submission.category}"`,
            `"${submission.duration}"`,
            `"${submission.participants || ''}"`,
            `"${(submission.resources || '').replace(/"/g, '""')}"`,
            `"${new Date(submission.timestamp).toLocaleString()}"`
        ].join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `engineer-day-submissions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
