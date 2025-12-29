package com.portfolio.myportfolio.models;


public class Command {
    private String commandName;
    private String name;
    private String content;

    public Command(String commandName, String name, String content) {
        this.commandName = commandName;
        this.name = name;
        this.content = content;
    }
    public String getCommandName() {
        return commandName;
    }

    public String getName() {
        return name;
    }

    public String getContent() {
        return content;
    }



}
