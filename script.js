const players = [
    { name: "Ahmed Ghazanfar", cnic: "4610000214903", status: "Not Present" },
    { name: "Mecayl Rashid", cnic: "4210161583953", status: "Not Present" },
    { name: "Syed Yafis Ali", cnic: "229073", status: "Not Present" },
    { name: "Fuzail Ashraf Khan", cnic: "4680000245482", status: "Not Present" },
    { name: "Mohammad Zohair Khawar", cnic: "4220118135411", status: "Not Present" },
    { name: "Abbas Raza Zaidi", cnic: "4220121084903", status: "Not Present" },
    { name: "Abdul Moiz Khalid", cnic: "3730322083147", status: "Not Present" },
    { name: "Syed Muhammad Hasnain Rizvi", cnic: "44250159163623", status: "Not Present" },
    { name: "Zuhayr Khurram Khwaja", cnic: "4220151234393", status: "Not Present" },
    { name: "Muhammad Huzaifa", cnic: "4220195568491", status: "Not Present" },
    { name: "Muhammad Fasih Ahmed", cnic: "4220149822979", status: "Not Present" },
    { name: "Naufil Chowdhary", cnic: "4220118175379", status: "Not Present" },
    { name: "Yousuf Abbasi", cnic: "4220141466803", status: "Not Present" },
    { name: "Rafay Imran", cnic: "4210113134491", status: "Not Present" },
    { name: "Syed Bilal Adil Wadood", cnic: "4220191474803", status: "Not Present" },
    { name: "Muhammad Ali Farouqi", cnic: "4220191119387", status: "Not Present" },
    { name: "Kumail Ali Memon", cnic: "423019724737", status: "Not Present" },
    { name: "Izaan Aamir", cnic: "4210156007009", status: "Not Present" },
    { name: "Syed Hussain Abbas", cnic: "421014825175", status: "Not Present" },
    { name: "Saad Noman", cnic: "4210115199141", status: "Not Present" },
    { name: "Syed Yazdan Haider Zaidi", cnic: "4610000246232", status: "Not Present" },
    { name: "Ibad Asad", cnic: "4220160538583", status: "Not Present" },
    { name: "Muhammad Aayan Rizvi", cnic: "4700000246363", status: "Not Present" },
    { name: "Faraz Farooqui", cnic: "299188", status: "Not Present" },
    { name: "M. Burhan ur Rehman", cnic: "4210135268427", status: "Not Present" },
    { name: "Syed Murtaza Haider", cnic: "4210183200649", status: "Not Present" },
    { name: "Muzammil Ahmed Siddiqui", cnic: "4220185105111", status: "Not Present" },
    { name: "Uzair Abbasi", cnic: "4220157562697", status: "Not Present" },
    { name: "Syed Muhammad Hur Raza Zaidi", cnic: "4220170933087", status: "Not Present" },
    { name: "Syed Hassan Uddin", cnic: "4220113397129", status: "Not Present" },
    { name: "Muhammad Rafay", cnic: "4520332310075", status: "Not Present" },
    { name: "Abdul Qadir", cnic: "4240138154477", status: "Not Present" },
    { name: "Muhammad Shazan Ahmed", cnic: "4220146744625", status: "Not Present" },
    { name: "Muhammad Hammad Shaboo", cnic: "4210117944587", status: "Not Present" },
    { name: "Muhammad Kumail", cnic: "4210111388799", status: "Not Present" },
    { name: "Musa Ikram Khan", cnic: "4220198144769", status: "Not Present" },
    { name: "Muhammad Zohair Agha", cnic: "4240199536335", status: "Not Present" },
    { name: "Nasrullah Zaidi", cnic: "4220176355989", status: "Not Present" },
    { name: "Syed Muhammad Akber", cnic: "4210129805255", status: "Not Present" },
    { name: "Muhammad Abdullah Irfan", cnic: "4210116911479", status: "Not Present" }
];

// Load data from local storage if available
const storedData = JSON.parse(localStorage.getItem("eventData")) || players;

// Message container
const messageContainer = document.getElementById("message-container");

// Render Table
function renderTable() {
    const tableBody = document.getElementById("player-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Clear existing rows
    storedData.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.cnic}</td>
            <td onclick="promptForPassword(${index})" class="${player.status === 'Present' ? 'present' : 'not-present'}">
                ${player.status}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function searchAndMark() {
    const cnicInput = document.getElementById("search-cnic").value.replace(/\s+/g, ''); // Trim spaces
    const cnic = cnicInput.replace(/-/g, ''); // Remove dashes
    const validCnic = /^\d{13}$/.test(cnic); // Validate CNIC

    if (!validCnic) {
        showMessage("Please enter a valid 13-digit CNIC without spaces or dashes.");
        return;
    }

    const player = storedData.find(p => p.cnic === cnic);
    if (player) {
        player.status = "Present"; // Mark as present
        showMessage(`${player.name} marked as present!`);
    } else {
        showMessage("CNIC not found.");
    }
    saveData();
    renderTable();
}

function promptForPassword(index) {
    const password = prompt("Enter password to update status:");
    if (password === "yourPassword") { // Replace with your actual password
        storedData[index].status = storedData[index].status === "Present" ? "Not Present" : "Present"; // Toggle status
        showMessage(`${storedData[index].name}'s status updated to ${storedData[index].status}!`);
        saveData(); // Save data after updating status
        renderTable(); // Refresh the table to reflect changes
    } else {
        showMessage("Incorrect password.");
    }
}

function showMessage(message) {
    messageContainer.textContent = message;
    setTimeout(() => {
        messageContainer.textContent = ""; // Clear message after 3 seconds
    }, 3000);
}

function saveData() {
    localStorage.setItem("eventData", JSON.stringify(storedData));
}

function downloadXLS() {
    // Implement download functionality
    showMessage("Download XLS functionality is not implemented yet.");
}

// Initial render
renderTable();
