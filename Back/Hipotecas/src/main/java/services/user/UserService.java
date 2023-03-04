package services.user;

import java.nio.charset.StandardCharsets;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


import commonUtil.Util;
import models.User;
import sql.DbFunctions;

public class UserService {

	// CLEAN METHODS

	/**
	 * Store a user and set the cookie value
	 * @param username
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public boolean register(String username, String password) throws SQLException {

		// EJECUTAMOS LA SIGUIENTE QUERY PARA COMPROBAR QUE NO HAY OTRO USUARIO CON EL
		// MISMO USERNAME | MAIL
		String usernameCompare = "select username from users where username = ? ";

		ResultSet accountRs = DbFunctions.Select(usernameCompare, new Object[] { username });
		String account = "";

		while (accountRs.next()) {
			account = accountRs.getString("username");

		}

		// SI SE ENCUENTRAN RESULTADOS
		if (account != "") {

			// DEVOLVEMOS 0 PARA INFORMAR DE QUE YA EXISTE UN USUARIO CON ESOS DATOS
			return false;

			// SI NO SE ENCUNETRAN RESULTADOS
		} else {

		
			// INSERTAMOS EL USUARIO
			String insertQuery = "0, ?, ?, ?";
			DbFunctions.Insert("users", insertQuery,
					new Object[] {username, password });

			// DEVOLVEMOS 1 PARA INDICAR QUE LA OPERACIÓN SE HA REALIZADO CON ÉXITO
			return true;
		}
	}

	/**
	 * Get current cookies of a user in json format
	 * @param username
	 * @return
	 * @throws SQLException
	 */
	public String getCookies(String username) throws SQLException {

			String queryUser = "select * from users where username = ?";
			ResultSet userRs = DbFunctions.Select(queryUser, new Object[] { username });

			String userToken = null;
			userRs.next();

			User ur = new User(userRs.getInt("userId"), userRs.getString("username"),
					userRs.getString("password"), userRs.getString("tempToken"));
			
			userToken = ur.getTempToken();

			String jsonInicio = "{\r\n" + "     \"token\": [";
			String jsonFinal = "\n    }]\r\n" + "}";

			return (jsonInicio + "{\r\n" + "        \"token\": \"" + userToken + "\"" + jsonFinal);

		}

	
	/**
	 * Validate if user exists
	 * @param username
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public int login(String username, String password) throws SQLException {

			// CREAMOS 2 CONSULTAS PARA DETERMINAR SI EL USUARIO SE LOGEA CON USERNAME O
			// MAIL

			String userCompare = "select username from users where  username = ? and password = ? ";

			ResultSet unameRs = DbFunctions.Select(userCompare, new Object[] { username, password});

			unameRs.next();
			if (!(unameRs.getString("username").equalsIgnoreCase(""))) {
				String token = Util.genreRandomString();
				
				String Query = " tempToken = ?  where username = ? ";
				DbFunctions.Update("users", Query,
						new Object[] { token, username});
				// DEVOLVEMOS 1 INDICANDO QUE SE HA COMPLETADO LA OPERACIÓN COMPLETAMENTE
				return 1;

			} else {
				return 0;
			}
		}

	
}