import { fetchData } from "./components/TheDataMiner.js";
import ProjectCard from "./components/TheProjectCard.js";
import { SendMail } from "./components/mailer.js";

(() => {

    let vue_vm = new Vue({

        data: {
            message: "Project name: Product Scene Build",
            anotherMessage: "The project used cosmetics containers made of cinema 4d to add appropriate colors and taxures, and added background and effect to suit the atmosphere of cosmetics in Photoshop.",
            artprojects: [],
            currentProjectData: {}
        },

        // this is the "mounted" lifecycle hook. Vue is done creating itself, and has attached itself to the "app" div on the page
        mounted: function() {
            console.log("Vue is mounted, trying a fetch for the initial data");
            
            fetchData("./includes/index.php")
                .then(data => {
                    data.forEach(project => this.artprojects.push(project));
                })
                .catch(err => console.error(err));      
        },

        updated: function() {
            console.log('Vue just updated the DOM');
        },

        methods: {
            logClicked() {
                console.log("clicked on a list item");
            },

            clickHeader() {
                console.log("clicked on the header");
            },

            next: function() {
                this.currentIndex += 1;
              },
              prev: function() {
                this.currentIndex -= 1;
              },
        },

        components: {
            "project-card": ProjectCard
        }
    }).$mount("#app");

    let mailSubmit = document.querySelector('.submit-wrapper');

    function processMailFailure(result) {
        // show a failure message in the UI
        console.table(result); // table shows us an object in table form
        alert(result.message);

        // show some UI here to let the user know the mail attempt was successful
    }

    function processMailSuccess(result) {
        // show a success message in the UI
        console.table(result); // table shows us an object in table form
        alert(result.message);

        // show some UI here to let the user know the mail attempt was successful
    }

    function processMail(event) {
        // block the default submit behaviour
        event.preventDefault();

        // use the SendMail component to try to process mail
        SendMail(this.parentNode)
            .then(data => processMailSuccess(data))
            .catch(err => processMailFailure(err));

            // the error handler in the catch block could actually be a generic catch-and-display function that handles EVERY error you might encounter during runtime. Might be a better strategy to pass in a flag or just a message and have the function display it in the UI
    }

    mailSubmit.addEventListener("click", processMail);
})();