package com.example.demo;


public class Word {
    private int id;
    private String word;
    private String hint;

    public Word(int id, String word, String hint) {
        this.id = id;
        this.word = word;
        this.hint = hint;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }
}
