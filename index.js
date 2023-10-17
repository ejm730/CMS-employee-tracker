const mainPrompt = require('./prompt');

const init = async () => {
    console.log("Welcome to Employee Tracker!");
    await mainPrompt();
};

init();
