package models;

import java.sql.ResultSet;
import java.sql.SQLException;

import sql.DbFunctions;
/**
 * Simulation Class
 * @author rafa,heber
 *
 */
public class Simulation {

	private int id;
	private int userId;
	private String creationDate;
	private float initial;
	private String duration;
	private float fee;
	
	
	/**
	 * Empty
	 */
	public Simulation() {
		
	}
	
	/**
	 * Full
	 * @param id
	 * @param userId
	 * @param creationDate
	 * @param initial
	 * @param duration
	 * @param fee
	 */
	public Simulation(int id, int userId, String creationDate, float initial, String duration, float fee) {
		super();
		this.id = id;
		this.userId = userId;
		this.creationDate = creationDate;
		this.initial = initial;
		this.duration = duration;
		this.fee = fee;
	}
	
	/**
	 * Parse values to Json
	 * @return
	 */
	public static String ToJson(int userId) throws SQLException {

		// DECLARAMOS LA ESTRUCTURA DE INICIO
		String estructuraInicio = "\n\"Transactions\": [";

		String transactions = "";

		String tempQuery = "select * from simulations where userId = ? ";
		ResultSet transaction = DbFunctions.Select(tempQuery, new Object[] { userId });

		while (transaction.next()) {
			transactions += "{";
			transactions += "\n\"id\": \"" + transaction.getInt("id") + "\",\n";
			transactions += "\"userId\": \"" + transaction.getInt("userId") + "\",\n";
			transactions += "\"creationDate\": \"" + transaction.getString("creationDate") + "\",\n";
			transactions += "\"initial\": \"" + transaction.getFloat("initial") + "\",\n";
			transactions += "\"duration\": \"" + transaction.getString("duration") + "\",\n";
			transactions += "\"fee\": \"" + transaction.getFloat("fee") + "\"\n";
			transactions += "},\n";
		}
		if (transactions.equals("")) {
			return "";
		}
		transactions = transactions.substring(0, transactions.length() - 2);
		transactions += "]\n";

		// CONCATENAMOS LOS STRINGS
		String complete = estructuraInicio + transactions;

		// DEVOLVEMOS EL STRING CONCATENADO
		return complete;

	}
	
	
	/**
	 * GETTERS / SETTERS
	 * @return
	 */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}
	public float getInitial() {
		return initial;
	}
	public void setInitial(float initial) {
		this.initial = initial;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public float getFee() {
		return fee;
	}
	public void setFee(float fee) {
		this.fee = fee;
	}
	
}
