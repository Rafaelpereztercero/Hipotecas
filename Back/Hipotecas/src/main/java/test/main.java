package test;

import java.sql.SQLException;

import models.Simulation;
import services.user.UserService;
import sql.DbFunctions;

public class main {
	public static void main(String args[]) throws SQLException  //static method  
	{  
		UserService us = new UserService();
		Simulation sm = new Simulation();
		var t =  DbFunctions.Select("select * from users", new Object[] { } );
		System.out.println(sm.ToJson(1));
	}
}
