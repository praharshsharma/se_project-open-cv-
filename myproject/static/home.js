// let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// let b1 = [['Monday', 'DSP', 'DSP LAB', 'EBM', 'CG'], ['Tuesday',
//     'SE LAB', 'F&NN', 'NMUP', 'DSP', 'EBM'], ['Wednesday', 'SE', 'F&NN', 'DSP', 'EBM'], ['Thursday', 'NMUP', 'CG', 'SE', 'CG LAB'], ['Friday', 'F&NN', 'NMUP', 'CG', 'SE', 'NMUP LAB']]
// console.log("in home.js");
// const unisublist = new Set();
// // Iterate through the 2D array and add elements to the Set
// for (const row of b1) {
//     for (var i = 1; i < row.length; i++) {
//         unisublist.add(row[i]);
//     }
// }
// // Convert the Set to an array to get unique elements
// const subjects = Array.from(unisublist);
// console.log(subjects);

let tdele = document.getElementsByTagName("td");

let subcards = document.getElementsByClassName("subcards")[0];

for (var i = 6; i < tdele.length; i++) {
    var td = tdele[i];
    td.addEventListener("click", function () {
        // Your event handling code here
        subcards.innerHTML = "";
        console.log("Clicked on TD:", this.innerHTML);
        var cl = this.classList;
        let dayind = parseInt(cl[0]);
        if (dayind == 0 || dayind == 6) {
            console.log('Holiday');
            var box1 = document.createElement("div");
            box1.className = "box1";

            // Create a new div element with the class "container1"
            var container1 = document.createElement("div");
            container1.className = "container1";

            var subname = document.createElement("div");
            subname.className = "subname";
            subname.textContent = "Holiday";
            box1.appendChild(container1);
            container1.appendChild(subname);
            subcards.appendChild(box1);
        }
        else {
            let sublist = b1[dayind - 1];
            for (var i = 1; i < sublist.length; i++) {
                // Create a new div element with the class "box1"
                var box1 = document.createElement("div");
                box1.setAttribute("class", "box1");
                box1.classList.add(sublist[i].replace(/\s/g, ""));

                // Create a new div element with the class "container1"
                var container1 = document.createElement("div");
                container1.className = "container1";

                // Create a div for "subname"
                var subname = document.createElement("div");
                subname.className = "subname";
                subname.textContent = sublist[i];

                // Create a div for "pb" with a "Present" button
                var pb = document.createElement("div");
                var presentButton = document.createElement("button");
                presentButton.textContent = "Present";
                presentButton.setAttribute("class", "pb");
                presentButton.classList.add(sublist[i].replace(/\s/g, ""));
                pb.appendChild(presentButton);

                // Create a div for "ab" with an "Absent" button
                var ab = document.createElement("div");
                // ab.className = "ab";
                var absentButton = document.createElement("button");
                absentButton.textContent = "Absent";
                absentButton.setAttribute("class", "ab");
                absentButton.classList.add(sublist[i].replace(/\s/g, ""));
                ab.appendChild(absentButton);

                // Create a div for "cb" with a "Cancel" button
                var cb = document.createElement("div");
                var cancelButton = document.createElement("button");
                cancelButton.textContent = "Cancel";
                cancelButton.setAttribute("class", "cb");
                cancelButton.classList.add(sublist[i].replace(/\s/g, ""));
                cb.appendChild(cancelButton);

                // Append all elements to the DOM in the correct order
                container1.appendChild(subname);
                container1.appendChild(pb);
                container1.appendChild(ab);
                container1.appendChild(cb);

                box1.appendChild(container1);

                // Add the "box1" element to the document body or any other parent element

                subcards.appendChild(box1);
            }
            var box1 = document.createElement("div");
            box1.className = "box1";

            // Create a new div element with the class "container1"
            var container1 = document.createElement("div");
            container1.className = "addsubcon";

            var addi = document.createElement("button");
            addi.textContent = "+";
            addi.setAttribute("class", "addi");
            addi.setAttribute("id", "showPopup");
            box1.appendChild(container1);
            container1.appendChild(addi);
            subcards.appendChild(box1);

            // Get the elements
            const showButton = document.getElementById("showPopup");
            const closeButton = document.getElementById("closePopup");
            const popup = document.getElementById("popup");
            const subjectList = document.getElementById("subjectList");

            // Function to populate the subject list dynamically
            function populateSubjectList() {
                subjects.forEach((subject) => {
                    const listItem = document.createElement("li");
                    listItem.textContent = subject;
                    subjectList.appendChild(listItem);
                });
            }

            // Call the function to populate the subject list
            populateSubjectList();

            // Function to show the pop-up
            function showPopup() {
                popup.style.display = "block";
            }

            // Function to close the pop-up
            function closePopup() {
                popup.style.display = "none";
            }

            // Add an event listener to the "Open Pop-up" button
            showButton.addEventListener("click", showPopup);

            // Add an event listener to the "Close" button
            closeButton.addEventListener("click", closePopup);

            // Add functionality for clicking subjects
            subjectList.addEventListener("click", function (event) {
                if (event.target.tagName === "LI") {
                    const selectedSubject = event.target.textContent;
                    // Add your functionality here for the selected subject
                    alert(`You clicked: ${selectedSubject}`);
                    
                    // const addisubn = selectedSubject;
                    // var box1 = document.createElement("div");
                    // box1.setAttribute("class", "box1");
                    // box1.classList.add(addisubn.replace(/\s/g, ""));

                    // // Create a new div element with the class "container1"
                    // var container1 = document.createElement("div");
                    // container1.className = "container1";

                    // // Create a div for "subname"
                    // var subname = document.createElement("div");
                    // subname.className = "subname";
                    // subname.textContent = addisubn;

                    // // Create a div for "pb" with a "Present" button
                    // var pb = document.createElement("div");
                    // var presentButton = document.createElement("button");
                    // presentButton.textContent = "Present";
                    // presentButton.setAttribute("class", "pb");
                    // presentButton.classList.add(addisubn.replace(/\s/g, ""));
                    // pb.appendChild(presentButton);

                    // // Create a div for "ab" with an "Absent" button
                    // var ab = document.createElement("div");
                    // // ab.className = "ab";
                    // var absentButton = document.createElement("button");
                    // absentButton.textContent = "Absent";
                    // absentButton.setAttribute("class", "ab");
                    // absentButton.classList.add(addisubn.replace(/\s/g, ""));
                    // ab.appendChild(absentButton);

                    // // Create a div for "cb" with a "Cancel" button
                    // var cb = document.createElement("div");
                    // var cancelButton = document.createElement("button");
                    // cancelButton.textContent = "Cancel";
                    // cancelButton.setAttribute("class", "cb");
                    // cancelButton.classList.add(addisubn.replace(/\s/g, ""));
                    // cb.appendChild(cancelButton);

                    // // Append all elements to the DOM in the correct order
                    // container1.appendChild(subname);
                    // container1.appendChild(pb);
                    // container1.appendChild(ab);
                    // container1.appendChild(cb);

                    // box1.appendChild(container1);

                    // // Add the "box1" element to the document body or any other parent element

                    // // let dup = subcards;
                    // // subcards="";
                    // // for(var i=0;i<dup.length-1;i++){
                    // //     subcards.appendChild(dup[i]);
                    // // }
                    // // subcards.appendChild(box1);
                    // // subcards.appendChild(dup[subcards.length-1]);
                    // subcards.appendChild(box1);

                }
            });
        }
    });
}


let allcards = subcards.getElementsByClassName("box1");

document.addEventListener("click", function (event) {
    // Check if the clicked element has the class "pb"
    if (event.target.classList.contains("pb")) {
        console.log("clicked");
        // Toggle the background color of the clicked button
        const button = event.target;
        const subn = button.classList[1];
        // Check if the button has a "green" class
        if (button.classList.contains("green")) {
            // Remove the "green" class and set the background color to the specified color
            button.classList.remove("green");
            button.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        } else {
            // Add the "green" class and set the background color to green
            button.classList.add("green");
            button.style.backgroundColor = "rgba(5, 249, 5, 0.539)";
        }

        //if user marked it absent and then without unselecting it user marked present

        for (var i = 0; i < allcards.length; i++) {
            if (allcards[i].classList[1] == subn) {
                var abwala = allcards[i].getElementsByClassName("ab")[0];
                if (abwala.classList[2] == "red") {
                    abwala.classList.remove("red");
                    abwala.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
            }
        }
    }
});


document.addEventListener("click", function (event) {
    // Check if the clicked element has the class "ab"
    if (event.target.classList.contains("ab")) {
        console.log("clicked");
        // Toggle the background color of the clicked button
        const button = event.target;
        const subn = button.classList[1];
        // Check if the button has a "red" class
        if (button.classList.contains("red")) {
            // Remove the "red" class and set the background color to the specified color
            button.classList.remove("red");
            button.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        } else {
            // Add the "red" class and set the background color to red
            button.classList.add("red");
            button.style.backgroundColor = "rgba(240, 7, 7, 0.539)";
        }
        //if user marked it present and then without unselecting it user marked absent

        for (var i = 0; i < allcards.length; i++) {
            if (allcards[i].classList[1] == subn) {
                var pbwala = allcards[i].getElementsByClassName("pb")[0];
                if (pbwala.classList[2] == "green") {
                    pbwala.classList.remove("green");
                    pbwala.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                }
            }
        }
    }
});


document.addEventListener("click", function (event) {
    // Check if the clicked element has the class "cb"
    if (event.target.classList.contains("cb")) {
        console.log("clicked");
        // Toggle the background color of the clicked button
        const button = event.target;
        const subn = button.classList[1];

        for (var i = 0; i < allcards.length; i++) {
            if (allcards[i].classList[1] == subn) {
                console.log(allcards[i]);
                //remove this allcards[i]
                allcards[i].remove();
            }
        }
    }
});










