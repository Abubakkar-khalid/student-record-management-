const toggleButton = document.getElementById("themeToggle");
const iconToggle = document.getElementById("icon");
const htmlTag = document.getElementsByTagName("html");

const form = document.getElementById("student-detail");


const thead = document.getElementById("data");

toggleButton.addEventListener("click", () => {
	if (htmlTag[0].attributes.getNamedItem("data-bs-theme").value === "light") {
		htmlTag[0].attributes.getNamedItem("data-bs-theme").value = "dark";
		iconToggle.classList.remove("bi-moon");
		iconToggle.classList.add("bi-brightness-high-fill");
		localStorage.setItem("theme", "dark");
	} else {
		htmlTag[0].attributes.getNamedItem("data-bs-theme").value = "light";
		iconToggle.classList.remove("bi-brightness-high-fill");
		iconToggle.classList.add("bi-moon");
		localStorage.setItem("theme", "light");
	}
});

function checkTheme() {
	let themeValue = localStorage.getItem("theme");
	if (themeValue === "light") {
		htmlTag[0].attributes.getNamedItem("data-bs-theme").value = "light";
		iconToggle.classList.remove("bi-brightness-high-fill");
		iconToggle.classList.add("bi-moon");
	} else {
		htmlTag[0].attributes.getNamedItem("data-bs-theme").value = "dark";
		iconToggle.classList.remove("bi-moon");
		iconToggle.classList.add("bi-brightness-high-fill");
	}
}

form.addEventListener("submit", (event) => {
    console.log("button clicked");
    event.preventDefault();

    const rollno = form.rollno.value;
    const name = form.name.value;
    const s_class = form.class.value;
    const math = form.math.value;
    const physics = form.physics.value;
    const chemistry = form.chemistry.value;
    const computer = form.computer.value;

    const alertContainer = document.getElementById("alert-message");
    if (isAvailable(rollno)) {
		alertContainer.classList.add('alert','alert-danger');
        alertContainer.innerHTML = "Roll No. already exists.";
        return;
    } else {
        if (rollno === "") {
            form.rollno.classList.add("is-invalid");
            document.getElementById("rollno-message").classList.remove("d-none");
            return;
        } else if (name === "") {
            form.name.classList.add("is-invalid");
            document.getElementById("name-message").classList.remove("d-none");
            return;
        } else if (s_class === "") {
            form.s_class.classList.add("is-invalid");
            document.getElementById("class-message").classList.remove("d-none");
            return;
        } else if (math === "" || math < 0 || math > 100) {
            if (parseInt(math) < 0 || parseInt(math) > 100) {
                form.math.classList.add("is-invalid");
                document.getElementById("math-message").classList.remove("d-none");
                return;
            }
        } else if (physics === "" || physics < 0 || physics > 100) {
            if (parseInt(physics) < 0 || parseInt(physics) > 100) {
                form.physics.classList.add("is-invalid");
                document.getElementById("physics-message").classList.remove("d-none");
                return;
            }
        } else if (chemistry === "" || chemistry < 0 || chemistry > 100) {
            if (parseInt(chemistry) < 0 || parseInt(chemistry) > 100) {
                form.chemistry.classList.add("is-invalid");
                document.getElementById("chemistry-message").classList.remove("d-none");
                return;
            }
        } else if (computer === "" || computer < 0 || computer > 100) {
            if (parseInt(computer) < 0 || parseInt(computer) > 100) {
                form.computer.classList.add("is-invalid");
                document.getElementById("computer-message").classList.remove("d-none");
                return;
            }
        }

        const record = {
            rollno,
            name,
            s_class,
            math,
            physics,
            chemistry,
            computer,
        };
        let e_record = getRecords();
        if (e_record == null) {
            storeRecord([record]);
        } else {
            e_record.push(record);
            storeRecord(e_record);
        }
    }
    displayRecords();
    form.reset();
});



// Display student Record
function displayRecords() {
	thead.innerHTML = "";
	const records = getRecords();
	console.log(records);
	
	records.forEach((record) => {
		recordRow(
			record.rollno,
			record.name,
			record.s_class,
			record.math,
			record.physics,
			record.chemistry,
			record.computer,
		);
	});
}

function recordRow(rollno, name, s_class, math, physics, chemistry, computer) {
	let tr = document.createElement("tr");
	let rollNoTD = document.createElement("td");
	let nameTD = document.createElement("td");
	let classTD = document.createElement("td");
	let mathTD = document.createElement("td");
	let physicsTD = document.createElement("td");
	let chemistryTd = document.createElement("td");
	let computerTD = document.createElement("td");
	let omTD = document.createElement("td");
	let tmTD = document.createElement("td");
	let perTD = document.createElement("td");
	let gradeTD = document.createElement("td");
	let actionTD = document.createElement("td");

	rollNoTD.innerText = rollno;
	nameTD.innerText = name;
	classTD.innerText = s_class;
	mathTD.innerText = math;
	physicsTD.innerText = physics;
	chemistryTd.innerText = chemistry;
	computerTD.innerText = computer;
	tmTD.innerText = 400;

	let obtainMarks = parseInt(math) + parseInt(physics) + parseInt(chemistry) + parseInt(computer);
	console.log(obtainMarks);
	if (obtainMarks > 400) {
		omTD.innerText = "invalid numbers";
	} else {
		omTD.innerText = obtainMarks;
	}

	let percentage = (obtainMarks / 400) * 100;
	if (percentage > 100) {
		perTD.innerText = "invalid percentage";
	} else {
		perTD.innerText = `${percentage.toFixed(2)} %`;
	}

	if (percentage >= 90 && percentage <= 100) {
		gradeTD.innerText = "A+";
	} else if (percentage >= 80 && percentage < 90) {
		gradeTD.innerText = "A";
	} else if (percentage >= 70 && percentage < 80) {
		gradeTD.innerText = "B";
	} else if (percentage >= 60 && percentage < 70) {
		gradeTD.innerText = "C";
	} else if (percentage >= 50 && percentage < 60) {
		gradeTD.innerText = "D";
	} else {
		gradeTD.innerText = "Fail";
	}

	let div = document.createElement("div");
	div.classList.add("d-flex");
	let editButton = document.createElement("button");
	editButton.classList.add("btn");
	editButton.classList.add("btn-sm");
	editButton.classList.add("btn-info");
	editButton.classList.add("ms-2");
	let pencilIcon = document.createElement("i");
	pencilIcon.classList.add("bi");
	pencilIcon.classList.add("bi-pencil");
	editButton.appendChild(pencilIcon);

	let deleteButton = document.createElement("button");
	deleteButton.classList.add("btn");
	deleteButton.classList.add("btn-sm");
	deleteButton.classList.add("btn-danger");
	deleteButton.classList.add("ms-2");
	let trashIcon = document.createElement("i");
	trashIcon.classList.add("bi");
	trashIcon.classList.add("bi-trash");
	deleteButton.setAttribute("onClick", `deleteRecord('${rollno}')`);
	deleteButton.appendChild(trashIcon);

	div.appendChild(editButton);
	div.appendChild(deleteButton);

	actionTD.appendChild(div);

	tr.appendChild(rollNoTD);
	tr.appendChild(nameTD);
	tr.appendChild(classTD);
	tr.appendChild(mathTD);
	tr.appendChild(physicsTD);
	tr.appendChild(chemistryTd);
	tr.appendChild(computerTD);
	tr.appendChild(omTD);
	tr.appendChild(tmTD);
	tr.appendChild(perTD);
	tr.appendChild(gradeTD);
	tr.appendChild(actionTD);
	thead.appendChild(tr);
}

// Store student Record
function storeRecord(record) {
	localStorage.setItem("student-record", JSON.stringify(record));
}

// Get student Record
function getRecords() {
	return JSON.parse(localStorage.getItem("student-record"));
}

// Delete student Record
function deleteRecord(rollno) {
	const records = getRecords();
	let filterRecord = records.filter((record) => {
		return record.rollno !== rollno;
	});
	storeRecord(filterRecord);
	displayRecords();
}
function isAvailable(rollno) {
	let records = getRecords();
	if (!records) return false; // If there are no records, the roll number is not available.
	return records.some((r) => r.rollno === rollno); // Returns true if any record matches the roll number.
}
	checkTheme();
	displayRecords();
