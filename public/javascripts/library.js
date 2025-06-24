//smoth scroll to content
const department_nav = document.querySelector(".department-nav");
const department_content = document.querySelector(".department-content");
department_nav.addEventListener("click", (e) => {
    e.preventDefault();
    if (department_content) {
        department_content.scrollIntoView({
            behavior: 'smooth',
            block: "center",
        });
    }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeDepartmentButtons();
    createDepartmentSections();
    initializeSemesterTabs();
    loadSubjects('ic', 1);
});

// Initialize department buttons
function initializeDepartmentButtons() {
    const deptButtons = document.querySelectorAll('.dept-btn');

    deptButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            deptButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show selected department section
            const deptId = button.dataset.dept;
            showDepartment(deptId);
        });
    });
}

// Create department sections
function createDepartmentSections() {
    const contentArea = document.querySelector('.department-content');

    Object.entries(departments).forEach(([id, dept]) => {
        const section = document.createElement('section');
        section.id = id;
        section.className = 'dept-section';

        // Create semester tabs
        const semesterTabs = document.createElement('div');
        semesterTabs.className = 'semester-tabs';

        if (id === 'ic') {
            for (let sem = 1; sem <= 2; sem++) {
                const tab = document.createElement('button');
                tab.className = 'sem-tab' + (sem === 1 ? ' active' : '');
                tab.dataset.sem = sem;
                tab.textContent = `Sem ${sem}`;
                semesterTabs.appendChild(tab);
            }

        }
        else if (id === 'archi') {
            for (let sem = 1; sem <= 10; sem++) {
                const tab = document.createElement('button');
                tab.className = 'sem-tab' + (sem === 1 ? ' active' : '');
                tab.dataset.sem = sem;
                tab.textContent = `Sem ${sem}`;
                semesterTabs.appendChild(tab);
            }
        }
        else {
            for (let sem = 1; sem <= 8; sem++) {
                const tab = document.createElement('button');
                tab.className = 'sem-tab' + (sem === 1 ? ' active' : '');
                tab.dataset.sem = sem;
                tab.textContent = `Sem ${sem}`;
                semesterTabs.appendChild(tab);
            }
        }

        // Create subject grid
        const subjectGrid = document.createElement('div');
        subjectGrid.className = 'subject-grid';

        section.appendChild(semesterTabs);
        section.appendChild(subjectGrid);
        contentArea.appendChild(section);
    });
}

// Show selected department
function showDepartment(deptId) {
    const sections = document.querySelectorAll('.dept-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(deptId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        loadSubjects(deptId, 1); // Load first semester by default
    }
}

// Initialize semester tabs
function initializeSemesterTabs() {
    const sections = document.querySelectorAll('.dept-section');

    sections.forEach(section => {
        const tabs = section.querySelectorAll('.sem-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Load subjects for selected semester
                const deptId = section.id;
                const semester = tab.dataset.sem;
                loadSubjects(deptId, semester);
            });
        });
    });
}

// Load subjects for a department and semester
function loadSubjects(deptId, semester) {
    const section = document.getElementById(deptId);
    if (!section) return;

    const subjectGrid = section.querySelector('.subject-grid');
    const dept = departments[deptId];

    if (dept && dept.subjects[semester]) {
        const subjects = dept.subjects[semester];

        // Create subject cards
        subjectGrid.innerHTML = subjects.map(subject => `
            <div class="subject-card">
                <h3>${subject.name}</h3>
                <p class="subject-code">${subject.code}</p>
                <div class="subject-links">
                    <a href="#" class="btn btn-primary">
                        <i class="fas fa-book"></i> Notes
                    </a>
                    <a href="#" class="btn btn-secondary">
                        <i class="fas fa-file-pdf"></i> Books
                    </a>
                    <a href="#" class="btn btn-info">
                        <i class="fas fa-file-alt"></i> Papers
                    </a>
                </div>
            </div>
        `).join("");
    } else {
        subjectGrid.innerHTML = `
            <div class="no-content">
                <i class="fas fa-book-open"></i>
                <p>No subjects available for this semester</p>
            </div>
        `;
    }
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector("body");
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 