/* ================= FADE-IN SECTION ANIMATION ================= */
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach(section => observer.observe(section));

/* ================= HAMBURGER MENU TOGGLE (MOBILE-FRIENDLY) ================= */
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('show');

        // Prevent background scroll when menu is open
        document.body.style.overflow = navLinksContainer.classList.contains('show') ? 'hidden' : '';
    });
}

/* ================= CLOSE MENU ON LINK CLICK ================= */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('show');
        document.body.style.overflow = '';
    });
});

/* ================= AUTO CLOSE MENU ON SCROLL ================= */
window.addEventListener('scroll', () => {
    if (navLinksContainer.classList.contains('show')) {
        navLinksContainer.classList.remove('show');
        document.body.style.overflow = '';
    }
});

/* ================= NAVBAR ACTIVE LINK ON SCROLL ================= */
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 40;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

/* ================= SMOOTH SCROLL FOR NAV LINKS ================= */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        const offset = navbar.offsetHeight + 20;

        window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

/* ================= DYNAMIC CHART HEIGHTS ================= */
function setChartHeights() {
    const errorWrapper = document.querySelector('#errorChart').parentElement;
    const resultsWrapper = document.querySelector('#resultsChart').parentElement;
    const width = window.innerWidth;

    if (width > 1024) {
        errorWrapper.style.height = '400px';
        resultsWrapper.style.height = '400px';
    } else if (width > 768) {
        errorWrapper.style.height = '350px';
        resultsWrapper.style.height = '350px';
    } else if (width > 480) {
        errorWrapper.style.height = '300px';
        resultsWrapper.style.height = '300px';
    } else {
        errorWrapper.style.height = '250px';
        resultsWrapper.style.height = '250px';
    }
}

// Run on load and resize
window.addEventListener('load', setChartHeights);
window.addEventListener('resize', () => {
    setChartHeights();
    if (resultsChart) resultsChart.resize();
});

/* ================= ERROR DISTRIBUTION CHART ================= */
const ctxError = document.getElementById('errorChart');
if (ctxError) {
    new Chart(ctxError, {
        type: 'pie',
        data: {
            labels: ['Missing Field', 'Wrong Entry', 'Format Issue', 'No Error'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: ['#ff6384', '#ffce56', '#36a2eb', '#4bc0c0'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Error Type Distribution (%)',
                    font: { size: 18 }
                },
                legend: {
                    position: 'bottom'
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
}

/* ================= RESULTS COMPARISON CHART ================= */
const ctxResults = document.getElementById('resultsChart');
let resultsChart;

if (ctxResults) {
    resultsChart = new Chart(ctxResults, {
        type: 'bar',
        data: {
            labels: ['Missing Field', 'Wrong Entry', 'Format Issue', 'No Error'],
            datasets: [
                {
                    label: 'Before Improvement (%)',
                    data: [40, 30, 20, 10],
                    backgroundColor: '#ff6384'
                },
                {
                    label: 'After Improvement (%)',
                    data: [15, 10, 5, 70],
                    backgroundColor: '#36a2eb'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Error Rates Before vs After Improvements',
                    font: { size: 18 }
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Percentage (%)'
                    }
                }
            },
            animation: {
                duration: 1000
            }
        }
    });
}

/* ================= DOWNLOAD CHART BUTTON ================= */
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn && resultsChart) {
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = resultsChart.toBase64Image();
        link.download = 'Results_Impact_Chart.png';
        link.click();
    });
}
