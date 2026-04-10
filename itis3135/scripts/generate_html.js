document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-html-btn");
    const form = document.getElementById("intro-form");

    if (!generateBtn || !form) return;

    generateBtn.addEventListener("click", () => {
        // Validate form before processing
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const main = document.querySelector("main");
        const h2 = main.querySelector("h2");

        // Change the H2 title
        if (h2) h2.textContent = "Introduction HTML";

        // Gather data 
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName") || "";
        const lastName = formData.get("lastName");
        const nickname = formData.get("nickname");
        const mascotAdj = formData.get("mascotAdj");
        const mascotAnimal = formData.get("mascotAnimal");
        const personalStatement = formData.get("personalStatement");
        const quote = formData.get("quote");
        const quoteAuthor = formData.get("quoteAuthor");
        const divider = formData.get("divider") || "|";
        const picCaption = formData.get("picCaption");
        const ackStatement = formData.get("ackStatement");
        const ackDate = formData.get("ackDate");

        // Process Courses
        const depts = document.getElementsByName("courseDept[]");
        const nums = document.getElementsByName("courseNum[]");
        const names = document.getElementsByName("courseName[]");
        const reasons = document.getElementsByName("courseReason[]");
        let courseItems = "";
        for (let i = 0; i < depts.length; i++) {
            courseItems += `
            <li>
                <strong>${depts[i].value} ${nums[i].value}: ${names[i].value}</strong>
                <ul><li><em>Reason:</em> ${reasons[i].value}</li></ul>
            </li>`;
        }

        // Process Links
        const linkItems = [1, 2, 3, 4, 5]
            .map((i) => formData.get(`link${i}`))
            .filter((link) => (link))
            .map((link) => `<li><a href="${link}" target="_blank">${link}</a></li>`)
            .join("");

        // Handle Image
        const userImageFile = document.getElementById("userImage").files[0];
        const imageUrl = userImageFile ? URL.createObjectURL(userImageFile) : "itis3135/images/Screenshot-2026-01-17-173009.png";

        // Build the result HTML string
        const summaryHtml = `
<main>
    <h2>Introduction Summary</h2>
    <h3>${firstName} ${middleName} ${divider} "${nickname}" ${divider} ${lastName}</h3>
    <figure>
        <img src="${imageUrl}" alt="User Image" style="max-width: 300px;">
        <figcaption>${picCaption}</figcaption>
    </figure>
    <p><strong>Acknowledgment:</strong> ${ackStatement} on ${ackDate}</p>
    <p><strong>Mascot:</strong> ${mascotAdj} ${mascotAnimal}</p>
    <p><strong>Personal Statement:</strong> ${personalStatement}</p>
    <h4>Background Details</h4>
    <ul>
        <li><strong>Personal:</strong> ${formData.get("bullet1")}</li>
        <li><strong>Professional:</strong> ${formData.get("bullet2")}</li>
        <li><strong>Academic:</strong> ${formData.get("bullet3")}</li>
        <li><strong>Subject Background:</strong> ${formData.get("bullet4")}</li>
        <li><strong>Primary Platform:</strong> ${formData.get("bullet5")}</li>
        <li><strong>Funny Thing:</strong> ${formData.get("bullet6")}</li>
        <li><strong>Other:</strong> ${formData.get("bullet7")}</li>
    </ul>
    <h4>Courses Currently Taking:</h4>
    <ul>${courseItems}</ul>
    <p><strong>Quote:</strong> "${quote}" - <em>${quoteAuthor}</em></p>
    <p><strong>Funny Thing:</strong> ${formData.get("funnyThing")}</p>
    <p><strong>Something I'd like to share:</strong> ${formData.get("share")}</p>
    <h4>Links</h4>
    <ul>${linkItems}</ul>
</main>`.trim();

        // Create display container and highlight code
        const section = document.createElement("section");
        const pre = document.createElement("pre");
        const code = document.createElement("code");
        code.className = "language-html";
        code.textContent = summaryHtml; // Using textContent to prevent browser from rendering the tags

        pre.appendChild(code);
        section.appendChild(pre);

        // Replace the form content
        const h3 = main.querySelector("h3");
        if (h3) h3.remove();
        form.remove();
        main.appendChild(section);

        // Apply syntax highlighting
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(code);
        }
    });
});