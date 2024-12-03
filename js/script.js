/* Multistep From Js */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cardiologyForm');
    const sections = document.querySelectorAll('.form-section');
    const progressBar = document.querySelector('.progress');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sectionCounter = document.getElementById('section-counter');
    const targetElement = document.getElementById('effective-workout');
    let currentSection = 0;

    function updateButtons() {
        prevBtn.style.display = currentSection === 0 ? 'none' : 'block';
        nextBtn.style.display = currentSection === sections.length - 1 ? 'none' : 'block';
    }

    function updateProgress() {
      
        const progress = ((currentSection + 1) / sections.length) * 100;

        progressBar.style.width = `${progress}%`;
    }

    function updateSectionCounter() {
        sectionCounter.textContent = `${currentSection + 1} / ${sections.length}`;
    }

    function showSection(sectionIndex) {
       
        sections.forEach((section, index) => {
            section.classList.toggle('active', index === sectionIndex);
        });
        updateButtons();
        updateProgress();
        updateSectionCounter();
    }

    prevBtn.addEventListener('click', () => {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    });

   // Automatically go to the "effective-workout" section when a label inside section 2 is clicked
//    const section2 = sections[1]; // Assuming section 2 is the second section (index 1)
//    section2.addEventListener('click', (event) => {
//        if (event.target.tagName === 'LABEL') {
//            currentSection = Array.from(sections).indexOf(targetElement); // Find index of the target section
//            showSection(currentSection);
//            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//        }
//    });

    showSection(currentSection);
});

/*  circle counter js */

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.form-section');
    const form = document.getElementById('cardiologyForm');
    const stepValues = Array(sections.length).fill(0);

    let currentProgress = 0;
    let targetProgress = 0; // Initialize targetProgress
    const animationDuration = 3000;
    const fps = 40;
    const totalFrames = (animationDuration / 1000) * fps;
    let increment = targetProgress / totalFrames; // Calculate initial increment

    const canvas = document.getElementById("progressCanvas");
    const ctx = canvas ? canvas.getContext("2d") : null;
    const progressTextElement = document.getElementById("progressText");
    const targetSection = document.getElementById("effective-workout");
    const greatNewsSection = document.getElementById("great_news");
    const archiveEffectiveWorkout = document.querySelector(".archive-effective-workout");

    if (!canvas || !ctx) {
        console.error("Canvas or its context is not available.");
        return;
    }

    canvas.width = 350;
    canvas.height = 350;
    canvas.style.borderRadius = "50%";

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let radius = canvas.width / 2.2;
    const lineWidth = 6;
    const dotRadius = 12;

    function drawProgress(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (progress / 100) * 2 * Math.PI;

        // Draw arc
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "#3EB8E5";
        ctx.stroke();

        // Draw dot
        const dotAngle = endAngle;
        const dotX = centerX + radius * Math.cos(dotAngle);
        const dotY = centerY + radius * Math.sin(dotAngle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#3EB8E5";
        ctx.fill();
    }

    function scrollToGreatNews() {
        if (greatNewsSection) {
            greatNewsSection.scrollIntoView({ 
                behavior: "smooth", 
                block: "center",
            });
        }
    }

    function animateProgress() {
        if (currentProgress < targetProgress) {
            currentProgress += increment;
            progressTextElement.innerHTML = `${Math.round(currentProgress)}<sub>%</sub>`;
            drawProgress(currentProgress);
            requestAnimationFrame(animateProgress);
        } else {
            currentProgress = targetProgress;
            progressTextElement.innerHTML = `${Math.round(currentProgress)}<sub>%</sub>`;
            drawProgress(targetProgress);

            setTimeout(() => {
                if (archiveEffectiveWorkout) {
                    archiveEffectiveWorkout.classList.remove("active");
                }
                if (greatNewsSection) {
                    greatNewsSection.classList.add("active");
                }
                scrollToGreatNews();
            }, 2000);
        }
    }

    form.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
            const sectionIndex = Array.from(sections).indexOf(
                event.target.closest('.form-section')
            );

            const value = parseFloat(event.target.value) || 0;
            stepValues[sectionIndex] = value;

            const totalValue = stepValues.reduce((sum, value) => sum + value, 0);
            const result_value = (totalValue / 100) * 100;

            console.log("Result Value:", result_value);

            // Update targetProgress and recalculate increment
            targetProgress = result_value;
            increment = targetProgress / totalFrames;
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateProgress();
                    }, 700);
                    observer.unobserve(targetSection);
                }
            });
        },
        {
            root: null,
            threshold: 0.1,
        }
    );

    if (targetSection) {
        observer.observe(targetSection);
    } else {
        console.error("Target section for Intersection Observer is not available.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
  
    const labels = document.querySelectorAll('.inr-both-started label');
    labels.forEach(label => {
        label.addEventListener('click', function() {
            document.querySelector('.multistep-form').classList.add('active');
            document.querySelector('.archive-your-dream').classList.remove('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.form-section');
    const form = document.getElementById('cardiologyForm');

    form.addEventListener('change', (event) => {
        if (event.target.type === 'radio') {
            const sectionIndex = Array.from(sections).indexOf(
                event.target.closest('.form-section')
            );
            if (event.target.classList.contains('common_cls')) {
                document.querySelector('.archive-effective-workout').classList.add('active');
                document.querySelector('.multistep-form').classList.remove('active');
            }
        }
    });

});










