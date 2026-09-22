let courses = [];

window.onload = async () => {
    courses = await fetchCourses();  // Fetch courses
    createNewStudent();
    console.log("courses fetched", courses);
};

document.getElementById('invoiceYes').addEventListener('change', function () {
    document.getElementById('invoiceDetails').classList.remove('hidden');
});

document.getElementById('invoiceNo').addEventListener('change', function () {
    document.getElementById('invoiceDetails').classList.add('hidden');
});

// Add new student row
document.getElementById('addStudent').addEventListener('click', function () {
    createNewStudent();
});

document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const rawText = document.getElementById("totalAmount").innerText;
    const cleanText = rawText.replace(/\D/g, '');

    const teacher = {
        lastName: document.getElementById("teacherLastName").value,
        firstName: document.getElementById("teacherFirstName").value,
        schoolMail: document.getElementById("schoolEmail").value,
        privateMail: document.getElementById("privateEmail").value,
        mobile: document.getElementById("mobilePhone").value,
        previousApplication: document.querySelector('input[name="previousNomination"]:checked').value,
        newsLetter: document.querySelector('input[name="newsletter"]').checked ? 1 : 0
    };
    const application = {
        teacherId: 0,
        schoolCode: document.getElementById("schoolCode").value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value === 'transfer' ? 1 : 2,
        invoiceNeeded: document.querySelector('input[name="invoiceNeeded"]:checked').value === 'yes' ? 1 : 0,
        billingInfo: {
            taxNumber: document.getElementById("taxNumber").value,
            invoiceName: document.getElementById("invoiceName").value,
            zipCode: document.getElementById("zipCode").value,
            city: document.getElementById("city").value,
            address: document.getElementById("address").value,
        },
        comments: document.getElementById("comments").value,
        price: parseInt(cleanText),
        privacyPolicy: document.querySelector('input[name="privacyPolicy"]').checked ? 1 : 0
    };
    const studentsArray = [];

    const students = document.querySelectorAll(".student-row");
    students.forEach(element => {
        const student = {
            lastName: element.querySelector('input[name="studentLastName[]"]').value,
            firstName: element.querySelector('input[name="studentFirstName[]"]').value,
            class: element.querySelector('select[name="grade[]"]').value,
            course: element.querySelector('select[name="course[]"]').value,
        }

        studentsArray.push(student);

    });

    const subscriptionData = {
        teacher: teacher,
        application: application,
        studentsArray: studentsArray
    }
    await fetchSubscription(subscriptionData);
    console.log("dt object: ", subscriptionData);
});

function createNewStudent(){
    const container = document.getElementById('studentsContainer');
    const newRow = document.createElement('div');
    newRow.className = 'student-row';
    newRow.innerHTML = `
                <input type="text" name="studentLastName[]" placeholder="Vezetéknév" required>
                <input type="text" name="studentFirstName[]" placeholder="Keresztnév" required>
                <select name="grade[]" required>
                    <option value="">Évfolyam</option>
                    <option value="1">1.</option>
                    <option value="2">2.</option>
                    <option value="3">3.</option>
                    <option value="4">4.</option>
                    <option value="5">5.</option>
                    <option value="6">6.</option>
                    <option value="7">7.</option>
                    <option value="8">8.</option>
                    <option value="9">9.</option>
                    <option value="10">10.</option>
                    <option value="11">11.</option>
                    <option value="12">12.</option>
                </select>
                <select name="course[]" required>
                    <option value="">Kurzus</option>
                </select>
            `;
    const courseSelect = newRow.querySelector('select[name="course[]"]');
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.kurzus_id;
        option.textContent = course.kurzus_nev;
        courseSelect.appendChild(option);
    });

    courseSelect.addEventListener('change', () => updateTotal());
    container.appendChild(newRow);
    updateTotal();
}

async function fetchSubscription(data) {
    try {
        const response = await fetch(`/subscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        console.log("post sent");
    } catch (err) {
        console.error('Fetch error: ', err);
    }
}

async function fetchSchool(code) {
    try {

        const response = await fetch(`/schools/${code}`);

        if (!response.ok) {
            console.error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Fetch error: ', err);
    }
}

async function fetchCourses() {
    try {
        const response = await fetch('/courses');
        if (!response.ok) {
            console.error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error('Fetch error: ', err);
    }
}

// Mock function to simulate school data loading
document.getElementById('schoolCode').addEventListener('blur', async function () {
    const code = this.value;
    if (code) {
        const schoolObject = await fetchSchool(code);
        // Mock data - in a real app this would be an API call
        document.getElementById('schoolName').value = schoolObject.intezmeny_nev;
        document.getElementById('schoolAddress').value = schoolObject.cim;
    }
});

// Mock function to calculate total
function updateTotal() {
    const studentCount = document.querySelectorAll('.student-row').length;
    let totalAmount = 0;

    // Loop through each student row and calculate the total
    document.querySelectorAll('.student-row').forEach(row => {
        const courseSelect = row.querySelector('select[name="course[]"]');
        const selectedCourseId = courseSelect.value;

        // Find the selected course and get its price
        const selectedCourse = courses.find(course => course.kurzus_id == selectedCourseId);
        if (selectedCourse) {
            totalAmount += parseInt(selectedCourse.kurzus_dij);  // Add price of the selected course
        }
    });

    // Update the total in the UI
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString();
}

// Initialize total calculation
updateTotal();