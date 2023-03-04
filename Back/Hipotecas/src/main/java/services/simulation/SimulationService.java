package services.simulation;

import java.sql.ResultSet;
import java.sql.SQLException;

import sql.DbFunctions;

public class SimulationService {
	
	/**
	 * Function to store a simulation
	 * @param userId
	 * @param creationDate
	 * @param initial
	 * @param duration
	 * @param fee
	 * @return
	 * @throws SQLException
	 */
	public boolean addSimulation(String userId, String creationDate, float initial, String duration, float fee) throws SQLException {

				// INSERTAMOS EL USUARIO
				String insertQuery = "0, ?, ?, ?, ?, ?";
				DbFunctions.Insert("simulations", insertQuery,
						new Object[] {userId, creationDate, initial, duration, fee });

				// DEVOLVEMOS 1 PARA INDICAR QUE LA OPERACIÓN SE HA REALIZADO CON ÉXITO
				return true;
			}
		}

