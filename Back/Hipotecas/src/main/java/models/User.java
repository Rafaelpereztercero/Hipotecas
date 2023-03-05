package models;

/**
 * User Class
 * @author rafa,heber
 *
 */
public class User  {

	private int id;
	private String username;
	private String password;
	private String tempToken;

	/**
	 * Empty
	 */
	public User() {

	}
	
	/**
	 * Full
	 * @param id
	 * @param username
	 * @param password
	 * @param tempToken
	 */
	public User(int id,String username, String password, String tempToken) {
		
		setId(id);
		setUsername(username);
		setPassword(password);
		setTempToken(tempToken);

	}
	
	/**
	 * Parse values to Json
	 * @return
	 */
	public String toJson() {
		
		String content = "{";
		content += "\"id\": \"" + this.getId() + "\",\n";
		content += "\"username\": \"" + this.getUsername() + "\",\n";
		content += "\"password\": \"" + this.getPassword() + "\",\n";
		content += "\"tempToken\": \"" + this.getTempToken() + "\",\n";

		return content;
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
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getTempToken() {
		return tempToken;
	}

	public void setTempToken(String tempToken) {
		this.tempToken = tempToken;
	}

			
			
	// GETTERS AND SETTERS

	

	
}