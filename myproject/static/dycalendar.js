// function load_js() {
//     var body = document.getElementsByTagName('body')[0];
//     var scripttoremove = body.getElementsByTagName('script')[2];
//     console.log(scripttoremove);
//     // body.removeChild(scripttoremove);
//     var parent = scripttoremove.parentNode;

//     // Remove the script element from its parent
//     parent.removeChild(scripttoremove);
//     console.log(days);
//     var script = document.createElement('script');
//     script.src = 'home.js';
//     body.appendChild(script);
// }
(function (global) {

    "use strict";

    var
        //this will be used by the user.
        dycalendar = {},

        //window document
        document = global.document,

        //starting year
        START_YEAR = 1900,

        //end year
        END_YEAR = 9999,

        //name of the months
        monthName = {
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        //name of the days
        dayName = {
            full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            d: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };

    /**
 * this function will create month table.
 *
 * @param object data   this contains the calendar data
 * @param object option this is the settings object
 * @return html
 */
    function createMonthTable(data, option) {
        console.log(data);

        var
            table, tr, td,
            r, c, count;

        table = document.createElement("table");
        tr = document.createElement("tr");

        //create 1st row for the day letters
        for (c = 0; c <= 6; c = c + 1) {
            td = document.createElement("td");
            td.innerHTML = "SMTWTFS"[c];
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //create 2nd row for dates
        tr = document.createElement("tr");

        //blank td
        for (c = 0; c <= 6; c = c + 1) {
            if (c === data.firstDayIndex) {
                break;
            }
            td = document.createElement("td");
            tr.appendChild(td);
        }

        //remaing td of dates for the 2nd row
        count = 1;
        while (c <= 6) {
            td = document.createElement("td");
            td.innerHTML = count;
            console.log(count, " ", data.monthIndex, " ", "SMTWTFS"[c], " ", data.year);
            if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                td.setAttribute("class", "dycalendar-today-date");
            }
            if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                td.setAttribute("class", "dycalendar-target-date");
            }
            td.classList.add(c);
            td.classList.add(data.year);
            td.classList.add(data.monthIndex);
            tr.appendChild(td);
            count = count + 1;
            c = c + 1;
        }
        table.appendChild(tr);

        //create remaining rows
        for (r = 3; r <= 7; r = r + 1) {
            tr = document.createElement("tr");
            for (c = 0; c <= 6; c = c + 1) {
                if (count > data.totaldays) {
                    table.appendChild(tr);
                    return table;
                }
                td = document.createElement('td');
                td.innerHTML = count;
                console.log(count, " ", data.monthIndex, " ", "SMTWTFS"[c], " ", data.year);
                if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                    td.setAttribute("class", "dycalendar-today-date");
                }
                if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                    td.setAttribute("class", "dycalendar-target-date");
                }
                td.classList.add(c);
                td.classList.add(data.year);
                td.classList.add(data.monthIndex);
                count = count + 1;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        return table;
    }


    /**
     * this function will draw Calendar Month Table
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarMonthTable(data, option) {

        var
            table,
            div, container, elem;

        //get table
        table = createMonthTable(data, option);

        //calendar container
        container = document.createElement("div");
        container.setAttribute("class", "dycalendar-month-container");

        //-------------------------- Header ------------------

        //header div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-header");
        div.setAttribute("data-option", JSON.stringify(option));

        //prev button
        if (option.prevnextbutton === "show") {
            elem = document.createElement("span");
            elem.setAttribute("class", "dycalendar-prev-next-btn prev-btn");
            elem.setAttribute("data-date", option.date);
            elem.setAttribute("data-month", option.month);
            elem.setAttribute("data-year", option.year);
            elem.setAttribute("data-btn", "prev");
            elem.innerHTML = "&lt;";
            //add prev button span to header div
            div.appendChild(elem);
        }

        //month span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-month-year");
        if (option.monthformat === "mmm") {
            elem.innerHTML = data.monthName + " " + data.year;
        } else if (option.monthformat === "full") {
            elem.innerHTML = data.monthNameFull + " " + data.year;
        }

        //add month span to header div
        div.appendChild(elem);

        //next button
        if (option.prevnextbutton === "show") {
            elem = document.createElement("span");
            elem.setAttribute("class", "dycalendar-prev-next-btn next-btn");
            elem.setAttribute("data-date", option.date);
            elem.setAttribute("data-month", option.month);
            elem.setAttribute("data-year", option.year);
            elem.setAttribute("data-btn", "next");
            elem.innerHTML = "&gt;";
            //add prev button span to header div
            div.appendChild(elem);
        }

        //add header div to container
        container.appendChild(div);

        //-------------------------- Body ------------------

        //body div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-body");
        div.appendChild(table);

        //add body div to container div
        container.appendChild(div);

        //return container
        return container;
    }

    /**
     * this function will draw Calendar Day
     *
     * @param object data   this contains the calendar data
     * @param object option this is the settings object
     * @return html
     */
    function drawCalendarDay(data, option) {

        var
            div, container, elem;

        //calendar container
        container = document.createElement("div");
        container.setAttribute("class", "dycalendar-day-container");

        //-------------------------- Header ------------------

        //header div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-header");

        //day span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-day");
        if (option.dayformat === "ddd") {
            elem.innerHTML = dayName.ddd[data.targetedDayIndex];
        } else if (option.dayformat === "full") {
            elem.innerHTML = dayName.full[data.targetedDayIndex];
        }

        //add day span to footer div
        div.appendChild(elem);

        //add header div to container
        container.appendChild(div);

        //-------------------------- Body ------------------

        //body div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-body");

        //date span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-date");
        elem.innerHTML = data.date;

        //add date span to body div
        div.appendChild(elem);

        //add body div to container
        container.appendChild(div);

        //-------------------------- Footer ------------------

        //footer div
        div = document.createElement("div");
        div.setAttribute("class", "dycalendar-footer");

        //month span
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-span-month-year");
        if (option.monthformat === "mmm") {
            elem.innerHTML = data.monthName + " " + data.year;
        } else if (option.monthformat === "full") {
            elem.innerHTML = data.monthNameFull + " " + data.year;
        }

        //add month span to footer div
        div.appendChild(elem);

        //add footer div to container
        container.appendChild(div);

        //return container
        return container;
    }

    /**
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource(source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * This function will return calendar detail.
     *
     * @param integer year        1900-9999 (optional) if not set will consider
     *                          the current year.
     * @param integer month        0-11 (optional) 0 = Jan, 1 = Feb, ... 11 = Dec,
     *                          if not set will consider the current month.
     * @param integer date      1-31 (optional)
     * @return boolean|object    if error return false, else calendar detail
     */
    function getCalendar(year, month, date) {

        var
            dateObj = new Date(),
            dateString,
            result = {},
            idx;

        if (year < START_YEAR || year > END_YEAR) {
            global.console.error("Invalid Year");
            return false;
        }
        if (month > 11 || month < 0) {
            global.console.error("Invalid Month");
            return false;
        }
        if (date > 31 || date < 1) {
            global.console.error("Invalid Date");
            return false;
        }

        result.year = year;
        result.month = month;
        result.date = date;

        //today
        result.today = {};
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.today.dayIndex = idx;
        result.today.dayName = dateString[0];
        result.today.dayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.today.monthIndex = idx;
        result.today.monthName = dateString[1];
        result.today.monthNameFull = monthName.full[idx];

        result.today.date = dateObj.getDate();

        result.today.year = dateString[3];

        //get month-year first day
        dateObj.setDate(1);
        dateObj.setMonth(month);
        dateObj.setFullYear(year);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.firstDayIndex = idx;
        result.firstDayName = dateString[0];
        result.firstDayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.monthIndex = idx;
        result.monthName = dateString[1];
        result.monthNameFull = monthName.full[idx];

        //get total days for the month-year
        dateObj.setFullYear(year);
        dateObj.setMonth(month + 1);
        dateObj.setDate(0);
        result.totaldays = dateObj.getDate();

        //get month-year targeted date
        dateObj.setFullYear(year);
        dateObj.setMonth(month);
        dateObj.setDate(date);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.targetedDayIndex = idx;
        result.targetedDayName = dateString[0];
        result.targetedDayFullName = dayName.full[idx];

        return result;

    }

    /**
     * this function will handle the on click event.
     */
    function onClick() {

        document.body.onclick = function (e) {

            //get event object (window.event for IE compatibility)
            e = global.event || e;

            var
                //get target dom object reference
                targetDomObject = e.target || e.srcElement,

                //other variables
                date, month, year, btn, option, dateObj;

            //prev-next button click
            //extra checks to make sure object exists and contains the class of interest
            if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("dycalendar-prev-next-btn"))) {
                date = parseInt(targetDomObject.getAttribute("data-date"));
                month = parseInt(targetDomObject.getAttribute("data-month"));
                year = parseInt(targetDomObject.getAttribute("data-year"));
                btn = targetDomObject.getAttribute("data-btn");
                option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));

                if (btn === "prev") {
                    month = month - 1;
                    if (month < 0) {
                        year = year - 1;
                        month = 11;
                    }
                }
                else if (btn === "next") {
                    month = month + 1;
                    if (month > 11) {
                        year = year + 1;
                        month = 0;
                    }
                }

                option.date = date;
                option.month = month;
                option.year = year;

                drawCalendar(option);

                var body = document.getElementsByTagName("body")[0];
                var allscripts = body.getElementsByTagName("script");
                if (allscripts.length == 4) {
                    console.log("yes home loaded")
                    var scripttoremove = allscripts[2];
                    var parent = scripttoremove.parentNode;

                    // Remove the script element from its parent
                    parent.removeChild(scripttoremove);
                }

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

                // load_js();
            }

            //month click
            //extra checks to make sure object exists and contains the class of interest
            if ((targetDomObject) && (targetDomObject.classList) && (targetDomObject.classList.contains("dycalendar-span-month-year"))) {
                option = JSON.parse(targetDomObject.parentElement.getAttribute("data-option"));
                dateObj = new Date();

                option.date = dateObj.getDate();
                option.month = dateObj.getMonth();
                option.year = dateObj.getFullYear();

                drawCalendar(option);
            }
        };
    }

    //------------------------------ dycalendar.draw() ----------------------

    /**
     * this function will draw the calendar based on user preferences.
     *
     * option = {
     *  target : "#id|.class"   //(mandatory) for id use #id | for class use .class
     *  type : "calendar-type"  //(optional) values: "day|month" (default "day")
     *  month : "integer"       //(optional) value 0-11, where 0 = January, ... 11 = December (default current month)
     *  year : "integer"        //(optional) example 1990. (default current year)
     *  date : "integer"        //(optional) example 1-31. (default current date)
     *  monthformat : "full"    //(optional) values: "mmm|full" (default "full")
     *  dayformat : "full"      //(optional) values: "ddd|full" (default "full")
     *  highlighttoday : boolean    //(optional) (default false) if true will highlight today's date
     *  highlighttargetdate : boolean   //(optional) (default false) if true will highlight targeted date of the month year
     *  prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide") if set to "show" it will show the nav button (prev|next)
     * }
     *
     * @param object option     user preferences
     * @return boolean          true if success, false otherwise
     */
    dycalendar.draw = function (option) {

        //check if option is passed or not
        if (typeof option === "undefined") {
            global.console.error("Option missing");
            return false;
        }

        var
            self = this,    //pointing at dycalendar object

            dateObj = new Date(),

            //default settings
            defaults = {
                type: "day",
                month: dateObj.getMonth(),
                year: dateObj.getFullYear(),
                date: dateObj.getDate(),
                monthformat: "full",
                dayformat: "full",
                highlighttoday: false,
                highlighttargetdate: false,
                prevnextbutton: "hide"
            };

        //extend user options with predefined options
        option = extendSource(option, defaults);

        drawCalendar(option);

    };

    //------------------------------ dycalendar.draw() ends here ------------

    /**
     * this function will draw the calendar inside the target container.
     */
    function drawCalendar(option) {

        var
            //variables for creating calendar
            calendar,
            calendarHTML,
            targetedElementBy = "id",
            targetElem,

            //other variables
            i, len, elemArr;

        //find target element by
        if (option.target[0] === "#") {
            targetedElementBy = "id";
        } else if (option.target[0] === ".") {
            targetedElementBy = "class";
        }
        targetElem = option.target.substring(1);

        //get calendar HTML
        switch (option.type) {
            case "day":
                //get calendar detail
                calendar = getCalendar(option.year, option.month, option.date);
                //get calendar html
                calendarHTML = drawCalendarDay(calendar, option);
                break;

            case "month":
                //get calendar detail
                calendar = getCalendar(option.year, option.month, option.date);
                //get calendar html
                calendarHTML = drawCalendarMonthTable(calendar, option);
                break;

            default:
                global.console.error("Invalid type");
                return false;
        }

        //draw calendar
        if (targetedElementBy === "id") {

            document.getElementById(targetElem).innerHTML = calendarHTML.outerHTML;

        } else if (targetedElementBy === "class") {

            elemArr = document.getElementsByClassName(targetElem);
            for (i = 0, len = elemArr.length; i < len; i = i + 1) {
                elemArr[i].innerHTML = calendarHTML.outerHTML;
            }

        }
    }

    //events
    onClick();

    //attach to global window object
    global.dycalendar = dycalendar;

}(typeof window !== "undefined" ? window : this));


