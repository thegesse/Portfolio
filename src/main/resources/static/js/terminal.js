const input = document.getElementById("input");
const output = document.getElementById("output");



function appendLine(text) {
    if (output) {
        const line = document.createElement('div');
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    } else {
        console.error('Output element not found!');
    }
}

const PROMPT = "guestUser@portfolio:~$";

let commandHistory = [];
let historyIndex = -1;

let isTyping = false;
let skipTyping = false;

/* Blinking cursor */
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "█";

//add for safety
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[m]);
}

/* Print output text with clickable links */
function print(text = "") {
    const line = document.createElement("div");
    line.style.whiteSpace = "pre-wrap"; // Keeps ASCII art perfectly aligned
    line.style.minHeight = "1.2em";     // Ensures empty prints "" still take up space

    // Regex to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    parts.forEach(part => {
        if (part.match(urlRegex)) {
            // It's a URL - create a real link object
            const a = document.createElement("a");
            a.href = part;
            a.target = "_blank";
            a.style.color = "#e2b714";
            a.style.textDecoration = "underline";
            a.textContent = part; // SECURE: textContent doesn't execute code
            line.appendChild(a);
        } else {
            // It's normal text - add it as a safe text node
            line.appendChild(document.createTextNode(part));
        }
    });

    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

/* Print command with prompt */
function printCommand(cmd) {
    const line = document.createElement("div");

    const promptSpan = document.createElement("span");
    promptSpan.className = "prompt";
    promptSpan.textContent = PROMPT + " ";

    const cmdSpan = document.createElement("span");
    cmdSpan.className = "command";
    cmdSpan.textContent = cmd; // Securely sets text only

    line.appendChild(promptSpan);
    line.appendChild(cmdSpan);
    output.appendChild(line);

    output.scrollTop = output.scrollHeight;
}

/* Typing effect */
async function typeText(text, speed = 20) {
    isTyping = true;
    skipTyping = false;
    input.disabled = true;

    output.appendChild(cursor);

    for (let i = 0; i < text.length; i++) {
        if (skipTyping) {
            cursor.remove();
            print(text.slice(i));
            isTyping = false;
            input.disabled = false;
            return;
        }

        if (text[i] === "\n") {
            cursor.before(document.createElement("br"));
        } else {
            cursor.before(text[i]);
        }

        output.scrollTop = output.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, speed));
    }

    cursor.remove();
    output.appendChild(document.createElement("br"));

    isTyping = false;
    input.disabled = false;
}

/* Welcome message */
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

/* Keyboard input handling */
input.addEventListener("keydown", async (event) => {

    /* Skip typing animation */
    if (event.key === "Enter" && isTyping) {
        skipTyping = true;
        return;
    }

    if (event.key === "Enter") {
        const cmd = input.value.trim();
        input.value = "";

        if (!cmd) return;

        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        /* Clear terminal */
        if (cmd.toLowerCase() === "clear") {
            output.innerHTML = "";
            printWelcome();
            return;
        }

        printCommand(cmd);

        try {
            const response = await fetch(`/terminal/execute?cmd=${encodeURIComponent(cmd)}`);
            const data = await response.json();
            print(data.name);

            if (cmd.toLowerCase() === "connectionterminated" || cmd.toLowerCase() === "cogitoergosum") {
                await typeText(data.content, 22);
            } else if (cmd.toLowerCase() === "sudo rm --no-preserve-root -rf /") {
                const lines = data.content.split("\n");
                for (const line of lines) {
                    appendLine(line);
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
                await new Promise(resolve => setTimeout(resolve, 2000));

                appendLine("");
                appendLine("System rebooting...");

                await new Promise(resolve => setTimeout(resolve, 1000));
                output.innerHTML = "";
                printWelcome();
            }
            else {
                print(data.content);
            }

            print("");
        } catch (error) {
            print("Error: could not reach server");
        }
    }

    /* Command history */
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
