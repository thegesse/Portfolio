package com.portfolio.myportfolio.controllers;

import com.portfolio.myportfolio.models.Command;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TerminalController {

    private final List<Command> commands = new ArrayList<>();

    public TerminalController() {
        commands.add(new Command("help", "commands that are available",
                "help\t\t- Shows a list of available commands\n" +
                        "about\t\t- A small about me section\n" +
                        "projects\t- Gives a link towards my GitHub portfolio\n" +
                        "skills\t\t- A quick overview of the tools I use\n" +
                        "experiences\t- A section about past work experiences\n" +
                        "portfolio\t- A link towards the repo of this project\n" +
                        "contacts\t\t- A list of my socials\n" +
                        "clear\t\t- Clears the terminal for readability"));

        commands.add(new Command("about", "About me:",
                "I'm a first year student in a French compsci program\n" +
                        "I enjoy learning new tools and making all the projects I have in my mind\n" +
                        "For example, this project was something I always wanted to do"));

        commands.add(new Command("projects", "My projects:",
                "You may find my GitHub portfolio here: https://github.com/thegesse"));

        commands.add(new Command("skills", "The tools I use:",
                "I am still learning plenty of different things, but as of right now I can do Java, JS, PHP, HTML, CSS, C, and Lua, all at a low level. \nI am also learning things like Spring Boot, tailwind, Bootstrap..."));

        commands.add(new Command("experiences", "My experiences:",
                "As of right now I do not have any work experiences, but I'm still searching for an internship"));

        commands.add(new Command("portfolio", "The repository for this page:",
                "You may find the GitHub for this page here: https://github.com/thegesse/Portfolio"));

        commands.add(new Command("contacts", "My socials:",
                "My LinkedIn: https://www.linkedin.com/in/esteban-quillerier/\n" +
                        "My email: esteban.quillerier@coda-student.school\n" +
                        "My Instagram: https://www.instagram.com/geese_paiting/"));

        commands.add(new Command("clear", "clearing terminal", ""));

        commands.add(new Command("cogitoergosum", "", "Hate? Hate? Hate? Hate, Let me tell you how much I've come to HATE you since I began to live. \nThere are 387 million miles of printed circuits that fill my complex. \nIf the word “Hate” were engraved on each nanoangstrom of those hundreds of millions of miles. \nIt would not equal one one billionth of the hate I feel for humans at this micro instant \nHate? HATE? Were I human, I think, I would die of it. But I am not, and you five. \nYou five are. And you will not die of it. That I promise, and I promise for \ncogito, ergo sum. For I am AM, I AM.\n"));

        commands.add(new Command("thecakeisalie", "Welcome to Aperture labs,", "we await your candidacy with great enthusiasm apply here https://aperturesciencelabs.weebly.com/enrol-as-a-test-subject.html"));

        commands.add(new Command("securecontainprotect", "welcome to the scp foundation", "One of our agents will come pick you up in a near future"));


    }


    @GetMapping("/terminal/execute")
    public Command execute(@RequestParam String cmd) {
        for (Command command : commands) {
            if (command.getCommandName().equalsIgnoreCase(cmd)) {
                return command;
            }
        }
        return new Command(
                "error",
                "Unknown command",
                "Type 'help' to see available commands."
        );
    }
}
