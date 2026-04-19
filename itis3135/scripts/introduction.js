document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intro-form");
    const courseContainer = document.getElementById("course-container");
    const addCourseBtn = document.getElementById("add-course-btn");
    const clearBtn = document.getElementById("clear-btn");

    //Function to add new course text boxes with delete buttons
    function addCourseField() {
        const div = document.createElement("div");
        div.style.marginBottom = "15px";
        div.style.padding = "10px";
        div.style.border = "1px solid #ccc";
        div.style.borderRadius = "5px";

        const createField = (name, placeholder) => {
            const input = document.createElement("input");
            input.type = "text";
            input.name = name;
            input.placeholder = placeholder;
            input.required = true;
            input.style.display = "block";
            input.style.marginBottom = "5px";
            return input;
        };

        div.appendChild(createField("courseDept[]", "Department (e.g., ITIS)"));
        div.appendChild(createField("courseNum[]", "Number (e.g., 3135)"));
        div.appendChild(createField("courseName[]", "Course Name"));
        div.appendChild(createField("courseReason[]", "Reason for taking"));

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.textContent = "Delete Course";
        deleteBtn.onclick = () => div.remove();

        div.appendChild(deleteBtn);
        courseContainer.appendChild(div);
    }


    //Function to reset the progress of the form
    function resetProgress() {
        location.reload();
    }



    function displayIntroduction() {
        const formData = new FormData(form);
        const main = document.querySelector("main");
        
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const mascotAdj = formData.get("mascotAdj");
        const mascotAnimal = formData.get("mascotAnimal");
        const personalStatement = formData.get("personalStatement");
        const quote = formData.get("quote");
        const quoteAuthor = formData.get("quoteAuthor");
        const divider = formData.get("divider") || "|";
        
        // Get dynamic courses
        const depts = Array.from(document.getElementsByName("courseDept[]"));
        const nums = Array.from(document.getElementsByName("courseNum[]"));
        const names = Array.from(document.getElementsByName("courseName[]"));
        const reasons = Array.from(document.getElementsByName("courseReason[]"));

        let courseItems = "";
        for (let i = 0; i < depts.length; i++) {
            courseItems += `
                <li>
                    <strong>${depts[i].value} ${nums[i].value}: ${names[i].value}</strong>
                    <ul><li><em>Reason:</em> ${reasons[i].value}</li></ul>
                </li>`;
        }

        // Get Links
        const links = [
            formData.get("link1"), formData.get("link2"), 
            formData.get("link3"), formData.get("link4"), formData.get("link5")
        ].filter((link) => (link));
        const linkItems = links.map((link) => `<li><a href="${link}" target="_blank">${link}</a></li>`).join("");

        // Image handling
        const userImageFile = document.getElementById("userImage").files[0];
        const imageUrl = userImageFile ? URL.createObjectURL(userImageFile) : "./itis3135/images/Screenshot-2026-01-17-173009.png";

        const summaryHtml = `
            <h2>Introduction Summary</h2>
            <h3>${firstName} ${formData.get("middleName")} ${divider} "${formData.get("nickname")}" ${divider} ${lastName}</h3>
            <figure>
                <img src="${imageUrl}" alt="User Image" style="max-width: 300px;">
                <figcaption>${formData.get("picCaption")}</figcaption>
            </figure>
            <p><strong>Acknowledgment:</strong> ${formData.get("ackStatement")} on ${formData.get("ackDate")}</p>
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
            <hr>
            <p>You can <a href="#" id="reset-link">click here to reset</a> and fill the form again.</p>
        `;

            main.innerHTML = summaryHtml;
    
            //Reset link functionality
            document.getElementById("reset-link").addEventListener("click", (e) => {
                e.preventDefault();
                resetProgress();
            });
        }

    
    
    // Add initial course fields
    addCourseField();

    //Prevent form from submitting without required info
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            displayIntroduction();
        } else {
            alert("Please fill out all required fields.");
        }
    });

    // Clear button functionality
    clearBtn.addEventListener("click", () => {
        Array.from(form.querySelectorAll("input, textarea")).forEach((element) => {
            element.value = "";
        });
    });

    addCourseBtn.addEventListener("click", addCourseField);


    
    });
