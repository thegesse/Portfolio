const input = document.getElementById("input");
const output = document.getElementById("output");

const PROMPT = "guestUser@portfolio:~$";

let commandHistory = [];
let historyIndex = -1;

/* Print output text with clickable links */
function print(text = "") {
    // Convert URLs to clickable links
    const linked = text.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" style="color: #e2b714; text-decoration: underline;">$1</a>'
    );

    // Replace newlines with <br>
    output.innerHTML += linked.replace(/\n/g, "<br>") + "<br>";
    output.scrollTop = output.scrollHeight;
}

/* Print a command with a colored prompt */
function printCommand(cmd) {
    output.innerHTML +=
        `<span class="prompt">${PROMPT}</span> ` +
        `<span class="command">${cmd}</span><br>`;
    output.scrollTop = output.scrollHeight;
}

/* Welcome text with ASCII art */
function printWelcome() {
    print(
        `                                               _    __      _ _       
                                              | |  / _|    | (_)      
   __ _  ___  ___  ___  ___   _ __   ___  _ __| |_| |_ ___ | |_  ___  
  / _\` |/ _ \\/ _ \\/ __|/ _ \\ | '_ \\ / _ \\| '__| __|  _/ _ \\| | |/ _ \\ 
 | (_| |  __/  __/\\__ \\  __/ | |_) | (_) | |  | |_| || (_) | | | (_) |
  \\__, |\\___|\\___||___/\\___| | .__/ \\___/|_|   \\__|_| \\___/|_|_|\\___/ 
   __/ |                     | |                                      
  |___/                      |_|                                       `
    );
    print("");
    print("Welcome to my portfolio!");
    print("This format of portfolio has always been on my mind, and I am glad that I finally got the skills and patience to make this.\nI hope you enjoy it, and I will definitely add more in the future.");
    print("Type 'help' to see available commands");
    print("");
}

printWelcome();

/* Handle keyboard input */
input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const cmd = input.value.trim();
        input.value = "";

        if (!cmd) return;

        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        /* Clear terminal locally */
        if (cmd.toLowerCase() === "clear") {
            output.innerHTML = "";
            printWelcome();
            return;
        }

        /* Print the command with prompt */
        printCommand(cmd);

        /* Fetch command from server */
        try {
            const response = await fetch(`/terminal/execute?cmd=${encodeURIComponent(cmd)}`);
            const data = await response.json();

            print(data.name);
            print(data.content);
            print("");
        } catch (error) {
            print("Error: could not reach server");
        }
    }

    /* Command history navigation */
    if (event.key === "ArrowUp") {
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    }

    if (event.key === "ArrowDown") {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            input.value = "";
        }
    }
});
