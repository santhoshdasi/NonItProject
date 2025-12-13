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
    { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));

/* ================= NAVBAR ACTIVE LINK ON SCROLL ================= */
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
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

/* ================= ERROR DISTRIBUTION CHART ================= */
const ctxError = document.getElementById('errorChart').getContext('2d');

const errorChart = new Chart(ctxError, {
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
        plugins: {
            title: {
                display: true,
                text: 'Error Type Distribution (%)',
                font: { size: 18 }
            },
            legend: {
                position: 'right'
            }
        },
        animation: {
            duration: 1200,
            easing: 'easeOutQuart'
        }
    }
});

/* ================= RESULTS COMPARISON CHART ================= */
const ctxResults = document.getElementById('resultsChart').getContext('2d');

const resultsChart = new Chart(ctxResults, {
    type: 'bar',
    data: {
        labels: ['Missing Field', 'Wrong Entry', 'Format Issue', 'No Error'],
        datasets: [
            {
                label: 'Before Improvement (%)',
                data: [40, 30, 20, 10]
            },
            {
                label: 'After Improvement (%)',
                data: [15, 10, 5, 70]
            }
        ]
    },
    options: {
        responsive: true,
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
            duration: 1200,
            easing: 'easeOutQuart'
        }
    }
});

/* ================= DOWNLOAD CHART FUNCTION ================= */
const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = resultsChart.toBase64Image();
    link.download = 'Results_Impact_Chart.png';
    link.click();
});
