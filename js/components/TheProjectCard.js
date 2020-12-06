export default {
    name: "TheProjectCard",

    props: ["project"],

    // data needs to be a function inside a component
    data: function() {
        return {
            projectName: this.project.name,
            program: "IDP"
        }
    },

    created: function () {
        console.log(`created ${this.project.name}'s card`);
    },

    methods: {
        logClicked() {
            console.log(`fired from inside ${this.project.name}'s component!`);
        }
    }
}