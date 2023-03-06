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
		User ur = us.getUserByToken("7fac8qAa");
		String userJson = ur.toJson();
		String simulationsJson = Simulation.ToJson(ur.getId());
		if (simulationsJson != "") {
			userJson += ",";
		}
		userData = userJson + simulationsJson + "}"; 
		System.out.println(userData);
	}
}
