package test;

import java.sql.SQLException;

import models.Simulation;
import models.User;
import services.user.UserService;
import sql.DbFunctions;

public class main {
	public static void main(String args[]) throws SQLException  //static method  
	{  
		UserService us = new UserService();
		Simulation sm = new Simulation();
		String userData;
	
		System.out.println(userData);
	}
}
