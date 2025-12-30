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

        commands.add(new Command("themes", "a list of themes for this website", ""));

        commands.add(new Command("clear", "clearing terminal", ""));

        commands.add(new Command("cogitoergosum", "", "Hate? Hate? Hate? Hate, Let me tell you how much I've come to HATE you since I began to live. \nThere are 387 million miles of printed circuits that fill my complex. \nIf the word “Hate” were engraved on each nanoangstrom of those hundreds of millions of miles. \nIt would not equal one one billionth of the hate I feel for humans at this micro instant \nHate? HATE? Were I human, I think, I would die of it. But I am not, and you five. \nYou five are. And you will not die of it. That I promise, and I promise for \ncogito, ergo sum. For I am AM, I AM.\n"));

        commands.add(new Command("thecakeisalie", "Welcome to Aperture labs,", "we await your candidacy with great enthusiasm apply here https://aperturesciencelabs.weebly.com/enrol-as-a-test-subject.html"));

        commands.add(new Command("securecontainprotect", "welcome to the scp foundation", "One of our agents will come pick you up in a near future"));

        commands.add(new Command("Connectionterminated", "", "Connection terminated. \nI'm sorry to interrupt you, Elizabeth, if you still even remember that name, \nBut I'm afraid you've been misinformed. \nYou are not here to receive a gift, \nnor have you been called here by the individual you assume, although, you have indeed been called. \nYou have all been called here, into a labyrinth of sounds and smells, misdirection and misfortune. \nA labyrinth with no exit, a maze with no prize. \nYou don't even realize that you are trapped. Your lust for blood has driven you in endless circles, chasing the cries of children in some unseen chamber, always seeming so near, yet somehow out of reach, but you will never find them. \nNone of you will. \nThis is where your story ends. \nAnd to you, my brave volunteer, who somehow found this job listing not intended for you, although there was a way out planned for you, I have a feeling that's not what you want. \nI have a feeling that you are right where you want to be. I am remaining as well. I am nearby. \nThis place will not be remembered, and the memory of everything that started this can finally begin to fade away. As the agony of every tragedy should. \nAnd to you monsters trapped in the corridors, be still and give up your spirits. They don't belong to you. \nFor most of you, I believe there is peace and perhaps more waiting for you after the smoke clears. \nAlthough, for one of you, the darkest pit of Hell has opened to swallow you whole, \nso don't keep the devil waiting, old friend. \nMy daughter, if you can hear me, I knew you would return as well. It's in your nature to protect the innocent. \nI'm sorry that on that day, the day you were shut out and left to die, no one was there to lift you up into their arms the way you lifted others into yours, and then, what became of you. \nI should have known you wouldn't be content to disappear, not my daughter. I couldn't save you then, so let me save you now. \nIt's time to rest - for you, and for those you have carried in your arms. This ends for all of us. \nEnd communication."));


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
