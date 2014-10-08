/**   \author Adrien ORTOLA */
package http.database;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import configuration.ConfLoader;
import logger.Logger;

/**
 * \class DatabaseManager
 * \brief The purpose of this class is to manage the relation to the database server.
 * */
public class DatabaseManager {

	/** the url of the database server */
	private URL url;
	/** the client of the connection */
	private HttpURLConnection connection;

	/** 
	 * \param URL
	 * \return void
	 * \brief Constructor of the manager.
	 * */
	public DatabaseManager(String URL) {
		try {
			url = new URL(URL);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
	}

	/** 
	 * \param String method
	 * \return void
	 * \brief Connects to the database server
	 * */
	public void connect(String method) {
		try {
			connection = (HttpURLConnection) url.openConnection();
			connection.setDoInput(true);
			connection.setDoOutput(true);
			connection.setRequestMethod(method);
			connection.setRequestProperty("Content-type", "JSON");
			connection.connect();
		} catch (IOException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
	}

	/** 
	 * \param none
	 * \return String
	 * \brief Returns the response to the connection to the database server
	 * */
	public String getResponse() {
		String line;
		String response = "";
		try {
			BufferedReader s = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			line = s.readLine();
			while (line != null) {
				response = response + line;
				line = s.readLine();
			}
			s.close();
		} catch (Exception e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
		return response;
	}

	/** 
	 * \param none
	 * \return URL
	 * \brief Gets the url of the database server
	 * */
	public URL getUrl() {
		return url;
	}

	/** 
	 * \param URL url
	 * \return void
	 * \brief Sets the url of the database server
	 * */
	public void setUrl(URL url) {
		this.url = url;
	}
}
