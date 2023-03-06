package servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import models.Simulation;
import models.User;
import services.user.UserService;



/**
 * Servlet implementation class loadView
 */
@WebServlet("/SendUser")
public class SendUser extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		UserService us = new UserService();
		String token = request.getParameter("token");
		String userData = "";
		
		try {
			User ur = us.getUserByToken(token);
			String userJson = ur.toJson();
			String simulationsJson = Simulation.ToJson(ur.getId());
			if (simulationsJson != "") {
				userJson += ",";
			}
			userData = userJson + simulationsJson + "}";  ;
		} catch (Exception e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			userData = "please login again";
		}

		response.addHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append(userData);
	}
}