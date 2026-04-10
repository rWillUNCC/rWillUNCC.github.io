document.addEventListener("DOMContentLoaded", () => {
    const jsonBtn = document.getElementById("json-btn");
    const form = document.getElementById("intro-form");

    if (!jsonBtn || !form) return;

    jsonBtn.addEventListener("click", () => {
        // Validate form before processing
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const main = document.querySelector("main");
        const h2 = main.querySelector("h2");

        // Change the H2 title as per requirement
        if (h2) h2.textContent = "Introduction JSON";

        // Process dynamic course fields
        const depts = document.getElementsByName("courseDept[]");
        const nums = document.getElementsByName("courseNum[]");
        const names = document.getElementsByName("courseName[]");
        const reasons = document.getElementsByName("courseReason[]");
        const courses = [];
        for (let i = 0; i < depts.length; i++) {
            courses.push({
                department: depts[i].value,
                number: nums[i].value,
                name: names[i].value,
                reason: reasons[i].value
            });
        }

        // defined links
        const linkLabels = ["CLT Web", "GitHub.io", "GitHub", "freeCodeCamp", "LinkedIn"];
        const links = linkLabels
            .map((label, index) => ({
                name: label,
                href: formData.get(`link${index + 1}`)
            }))
            .filter((link) => link.href);

        // Handle user image path
        const userImageFile = document.getElementById("userImage").files[0];
        const imageUrl = userImageFile ? URL.createObjectURL(userImageFile) : "itis3135/images/Screenshot-2026-01-17-173009.png";

        // Build JSON
        const jsonOutput = {
            firstName: formData.get("firstName"),
            preferredName: formData.get("nickname"),
            middleInitial: formData.get("middleName"),
            lastName: formData.get("lastName"),
            acknowledgment: formData.get("ackStatement"),
            acknowledgmentDate: formData.get("ackDate"),
            divider: formData.get("divider") || "|",
            mascotAdjective: formData.get("mascotAdj"),
            mascotAnimal: formData.get("mascotAnimal"),
            image: imageUrl,
            imageCaption: formData.get("picCaption"),
            personalStatement: formData.get("personalStatement"),
            personalBackground: formData.get("bullet1"),
            professionalBackground: formData.get("bullet2"),
            academicBackground: formData.get("bullet3"),
            subjectBackground: formData.get("bullet4"),
            primaryComputer: formData.get("bullet5"),
            funnyThingBullet: formData.get("bullet6"),
            anythingElse: formData.get("bullet7"),
            quote: formData.get("quote"),
            quoteAuthor: formData.get("quoteAuthor"),
            funnyThing: formData.get("funnyThing"),
            share: formData.get("share"),
            courses: courses,
            links: links
        };

        // Create the display elements
        const section = document.createElement("section");
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        
        
        code.textContent = JSON.stringify(jsonOutput, null, 2);

        pre.appendChild(code);
        section.appendChild(pre);

        // Clear the form and append the code section
        const h3 = main.querySelector("h3");
        if (h3) h3.remove();
        form.remove();
        main.appendChild(section);

    });
});