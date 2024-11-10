(function () {
    // Get the toggle button and skills section
    const toggleButton = document.getElementById("toggleSkillsBtn") as HTMLButtonElement;
    const skillsSection = document.querySelector(".func") as HTMLElement;

    // Add click event listener to the button
    toggleButton.addEventListener("click", () => {
        // Toggle the 'hidden' class on the skills section
        if (skillsSection.classList.contains("hidden")) {
            // If skills section is hidden, show it
            skillsSection.classList.remove("hidden");
            toggleButton.textContent = "Hide Skills"; // Change button text
        } else {
            // If skills section is visible, hide it
            skillsSection.classList.add("hidden");
            toggleButton.textContent = "Show Skills"; // Change button text
        }
    });

    // Animate skills progress bars
    const skillProgItems = document.querySelectorAll(".skills-prog li");

    skillProgItems.forEach((item, i) => {
        const bar = item.querySelector(".skills-bar .bar") as HTMLElement;
        const percent = item.closest("li")?.getAttribute("data-percent");

        if (bar && percent) {
            // Animate width of the progress bar
            setTimeout(() => {
                bar.style.transitionDuration = ".5s";
                bar.style.width = `${percent}%`;
            }, i * 150);
        }
    });

    // Animate skills soft circles
    const skillSoftItems = document.querySelectorAll(".skills-soft li");

    skillSoftItems.forEach((item, i) => {
        const svg = item.querySelector("svg");
        const circle = svg?.querySelector(".cbar") as SVGCircleElement;
        const radius = parseFloat(circle?.getAttribute("r") || "0");
        const percent = item.parentElement?.getAttribute("data-percent");

        if (circle && percent) {
            const circumference = Math.PI * (radius * 2);
            const offset = ((100 - parseFloat(percent)) / 100) * circumference;

            // Set the initial circle stroke-dashoffset and stroke-dasharray
            circle.style.strokeDashoffset = circumference.toString();
            circle.style.strokeDasharray = circumference.toString();

            // Animate the strokeDashoffset to create the circle animation
            setTimeout(() => {
                circle.style.transitionDuration = ".3s";
                circle.style.strokeDashoffset = offset.toString();
            }, i * 150);

            // Animate the counter text
            const counterText = item.querySelector("small");

            if (counterText) {
                let counter = 0;
                const interval = setInterval(() => {
                    counter += Math.ceil(parseFloat(percent) / 100);
                    counterText.textContent = `${counter}%`;

                    if (counter >= parseFloat(percent)) {
                        clearInterval(interval);
                    }
                }, 10); // Update the counter every 10ms
            }
        }
    });
}).call(this);
