document.getElementById("educationBtn").addEventListener("click", function () {
    document.getElementById("educationSectionUnique").style.display = "block";
    document.getElementById("experienceSectionUnique").style.display = "none";

    // Change button styles
    document.getElementById("educationBtn").classList.add("active-button");
    document.getElementById("experienceBtn").classList.remove("active-button");

    // Refresh AOS if the education section might also be initially hidden or uses AOS
    // It's good practice even if only experience uses it now.
    AOS.refresh();
});

document.getElementById("experienceBtn").addEventListener("click", function () {
    document.getElementById("educationSectionUnique").style.display = "none";
    document.getElementById("experienceSectionUnique").style.display = "block"; // Make section visible FIRST

    // Change button styles
    document.getElementById("educationBtn").classList.remove("active-button");
    document.getElementById("experienceBtn").classList.add("active-button");

    // THEN refresh AOS to detect the newly visible elements
    AOS.refresh();
});

// --- Keep your Progress Bar Code Below ---
// (Make sure you've fixed the duplicate function issue from before)

// --- Initialize AOS ONCE on page load ---
// Make sure you have this line somewhere in your script, usually run after the DOM is ready
// or within a window.onload event if not already present.
// AOS.init(); // Example: You likely already have this somewhere.

// Example of initializing AOS on load if you don't have it:
window.addEventListener('load', function() {
    // Initialize your progress bars (using the corrected code from the previous answer)
    initSkillProgressBarAnimation();
    initSpecialSkillProgressBarAnimation();

    // Initialize AOS
    AOS.init({
        // You can add AOS options here if needed, e.g.:
        // duration: 1000,
        // once: true // whether animation should happen only once - while scrolling down
    });
});

// --- Progress Bar Animation Logic (Define ONCE) ---
function animateProgressBars(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find progress lines within the specific entry target
            const progressLines = entry.target.querySelectorAll('.progress-line');
            progressLines.forEach(line => {
                const percent = line.dataset.percent;
                // Ensure percent exists before setting style
                if (percent) {
                    line.style.width = percent + '%';
                } else {
                    console.warn('Progress line missing data-percent:', line);
                }
            });
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}

// --- Initialization for the REGULAR Skill Section ---
function initSkillProgressBarAnimation() {
    const skillSection = document.getElementById('skill'); // Target the #skill element
    if (!skillSection) {
        console.warn("Element with ID 'skill' not found for progress bar animation.");
        return; // Exit if the element doesn't exist
    }

    const observer = new IntersectionObserver(animateProgressBars, {
        root: null,
        threshold: 0.2,
    });

    observer.observe(skillSection);
}

// --- Initialization for the SPECIAL Skill Section ---
function initSpecialSkillProgressBarAnimation() {
    // Target the container with a paragraph having class 'textheading'
    const specialSkillSection = document.querySelector('.container:has(p.textheading)');
    if (!specialSkillSection) {
         console.warn("Element '.container:has(p.textheading)' not found for special progress bar animation.");
         return; // Exit if the element doesn't exist
    }

    const observer = new IntersectionObserver(animateProgressBars, {
        root: null,
        threshold: 0.2,
    });

    observer.observe(specialSkillSection);
}

// --- Initialize BOTH animations when the page loads ---
window.addEventListener('load', function() {
    initSkillProgressBarAnimation();       // Call the first initializer
    initSpecialSkillProgressBarAnimation(); // Call the second initializer
});
