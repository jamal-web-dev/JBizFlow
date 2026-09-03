/* =========================================
   JBizFlow Main JavaScript
   ========================================= */


/* =========================================
   NAVBAR ELEMENTS
   ========================================= */

const siteHeader = document.querySelector(".site-header");

const mobileMenuButton = document.querySelector(".mobile-menu-btn");

const mobileNav = document.querySelector(".mobile-nav");


/* =========================================
   NAVBAR SCROLL EFFECT
   ========================================= */

/*
   When the user scrolls down, we add the
   "scrolled" class to the header.

   CSS then changes the navbar from transparent
   to a dark glass-style background.
*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

    /* =========================================
   CLOSE MOBILE MENU AFTER SCROLLING WINDOW
   ========================================= */
    mobileNav.classList.remove("active");
    /*
        Return the X icon back to the
        normal hamburger icon.
    */
    mobileMenuButton.classList.remove("active");

});


/* =========================================
   MOBILE MENU
   ========================================= */

/*
   This controls the mobile navigation.

   We will add the visual animation in CSS
   once we activate the menu.
*/
mobileMenuButton.addEventListener("click", () => {

    /*
       Toggle the mobile navigation.
       Returns true when the menu is open.
    */
    const isOpen = mobileNav.classList.toggle("active");


    /*
       Add/remove the "active" class from the
       hamburger button.

       CSS uses this class to transform the
       hamburger icon into an X.
    */
    mobileMenuButton.classList.toggle("active", isOpen);


    /*
       Update aria-expanded so assistive
       technologies know whether the menu
       is currently open.
    */
    mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* =========================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
   ========================================= */

const mobileNavLinks =
    document.querySelectorAll(".mobile-nav-link, .mobile-nav-cta");

mobileNavLinks.forEach((link) => {

    link.addEventListener("click", () => {

        /*
           Close the mobile navigation.
        */
        mobileNav.classList.remove("active");


        /*
           Return the X icon back to the
           normal hamburger icon.
        */
        mobileMenuButton.classList.remove("active");


        /*
           Update accessibility state.
        */
        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================================
   JBIZFLOW EXPERIENCE / FEATURE SWITCHING
   ========================================================= */

/*
 * Select all feature navigation buttons.
 * These are the buttons for:
 * Sales
 * Inventory
 * Customers
 * Employees
 */
const featureButtons = document.querySelectorAll(".feature-nav-item");


/*
 * Select all feature content panels.
 * Only one panel will be visible at a time.
 */
const featureContents = document.querySelectorAll(".feature-content");


/*
 * Add a click event to every feature navigation button.
 */
featureButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /*
         * Get the feature name from the button.
         *
         * Example:
         * data-feature="sales"
         *
         * gives us:
         * "sales"
         */
        const selectedFeature = button.dataset.feature;


        /* =========================================
           REMOVE ACTIVE STATE FROM ALL BUTTONS
           ========================================= */

        featureButtons.forEach((item) => {
            item.classList.remove("active");
        });


        /* =========================================
           ADD ACTIVE STATE TO CLICKED BUTTON
           ========================================= */

        button.classList.add("active");


        /* =========================================
           HIDE ALL FEATURE CONTENT
           ========================================= */

        featureContents.forEach((content) => {
            content.classList.remove("active");
        });


        /* =========================================
           SHOW SELECTED FEATURE
           ========================================= */

        const selectedContent = document.getElementById(
            `feature-${selectedFeature}`
        );


        /*
         * Make sure the requested feature exists
         * before trying to display it.
         */
        if (selectedContent) {

            selectedContent.classList.add("active");

        }

    });

});

/* =========================================================
   SALES CHART ANIMATION
   ========================================================= */

/*
 * Find the sales chart line.
 */
const salesLine = document.querySelector(".sales-line");


/*
 * Only continue if the chart exists.
 */
if (salesLine) {

    /*
     * Get the total length of the SVG path.
     *
     * This allows us to create a drawing animation.
     */
    const lineLength = salesLine
        .querySelector("path")
        .getTotalLength();


    /*
     * Prepare the line for animation.
     */
    salesLine.querySelector("path").style.strokeDasharray =
        lineLength;


    salesLine.querySelector("path").style.strokeDashoffset =
        lineLength;


    /*
     * Trigger the drawing animation shortly
     * after the page loads.
     */
    setTimeout(() => {

        salesLine.querySelector("path").style.transition =
            "stroke-dashoffset 1.5s cubic-bezier(.65,0,.35,1)";

        salesLine.querySelector("path").style.strokeDashoffset =
            "0";

    }, 300);

}