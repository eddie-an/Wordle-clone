package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.sql.*;

@Service
public class WordService {

    @Value("${DB_URL}")
    private String DB_URL;

    @Value("${DB_USERNAME}")
    private String DB_USERNAME;

    @Value("${DB_PASSWORD}")
    private String DB_PASSWORD;

    public List<Word> getWords() {
        ArrayList<Word> returnVal = new ArrayList<>();
        Connection dbConnection = null;
        try {
            // This connection is going to be different for every user.
            // Make sure to change the url, user, and password.
            dbConnection = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD); // Change this line as needed
        } catch (SQLException e) {
            e.printStackTrace();
        }

        try {
            Statement statement = dbConnection.createStatement();
            ResultSet results = statement.executeQuery("SELECT * from WORDLIST;");
            while (results.next()) {
                int id = Integer.parseInt(results.getString("Id"));
                String word = results.getString("Word");
                String hint = results.getString("Hint");

                Word wordObject = new Word(id, word, hint);
                returnVal.add(wordObject);
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }

        return returnVal;

    }

}
