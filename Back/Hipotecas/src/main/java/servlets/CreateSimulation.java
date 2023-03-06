package servlets;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import services.user.UserService;
import sql.DbFunctions;

/**
 * Servlet implementation class CreateSimulation
 */
@WebServlet("/CreateSimulation")
public class CreateSimulation extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		
		String userId = request.getParameter("userId");
		String creationDate = request.getParameter("creationDate");
		String initial = request.getParameter("initial");
		String duration = request.getParameter("duration");
		String fee = request.getParameter("fee");

		String res = null;
		
		UserService us = new UserService();

		try {
			
			
			// INSERTAMOS EL USUARIO
			String insertQuery = "0, ?, ?, ?, ?, ?";
			DbFunctions.Insert("simulations", insertQuery,
			new Object[] {userId, creationDate, initial, duration, fee });
			
		} catch (SQLException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().append(res);

	}
}
