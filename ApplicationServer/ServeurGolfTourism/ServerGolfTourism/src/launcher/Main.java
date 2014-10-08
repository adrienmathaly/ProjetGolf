/**   \author Adrien ORTOLA */
package launcher;

import http.HTTPGolfServersLauncher;

/**
 * \class Main
 * \brief Entry point of the application
 * */
public class Main {

	/** 
	 * \param String[] args
	 * \return void
	 * \brief Starts the application
	 * */
	public static void main(String[] args) {
		HTTPGolfServersLauncher httpServer = new HTTPGolfServersLauncher();
	}
}
