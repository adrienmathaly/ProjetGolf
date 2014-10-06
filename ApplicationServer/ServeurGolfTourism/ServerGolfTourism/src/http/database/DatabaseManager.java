package http.database;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import configuration.ConfLoader;
import logger.Logger;

public class DatabaseManager {

	private URL url;
	private HttpURLConnection connection;

	public DatabaseManager(String URL) {
		try {
			url = new URL(URL);
		} catch (MalformedURLException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), e.toString());
		}
	}

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
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), e.toString());
		}
	}

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
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), e.toString());
		}
		return response;
	}

	public URL getUrl() {
		return url;
	}

	public void setUrl(URL url) {
		this.url = url;
	}
}
