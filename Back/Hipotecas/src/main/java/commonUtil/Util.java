package commonUtil;

public class Util {
	
	/**
	 * Genre random string
	 * @return
	 */
	public static String genreRandomString() {

		// DEFINIMOS UN STRING QUE DEVUELVA UNDEFINED POR SI SE PRODUCE UNA EXCEPCIÓN
		String otp2 = "UNDEFINED";
		try {

			// DEFINIMOS UN STRING VACÍO
			String otp = "";

			// DEFINIMOS QUE CARÁCTERES PUEDE CONTENER EL STRING CREADO PREVIAMENTE
			String characs = "a1b2c3d4e5f6g7h8j9k0lpoiuytreASDFGJEWFwqz";

			// HACEMOS UN BUCLE QUE INTRODUCE EN EL STRING VACÍO "otp" 8 CARÁCTERES
			// ALEATORIOS DE LA CADENA DE CARÁCTERES "characs"
			for (int x = 0; x < 8; x = x + 1) {
				int randomIndex = (int) (characs.length() * Math.random());
				otp += characs.charAt(randomIndex);

			}

			// DEVOLVEMOS EL STRING OTP
			return otp;

		} catch (Exception e) {

			// INFORMAMOS DEL ERROR
			System.out.println(e);

			// DEVOLVEMOS EL STRING OTP2
			return otp2;

		}

	}
}
