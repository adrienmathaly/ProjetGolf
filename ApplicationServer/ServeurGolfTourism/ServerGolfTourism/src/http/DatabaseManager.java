package http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class DatabaseManager {
	
	private URL url;
	private HttpURLConnection connection;
	
	public DatabaseManager(String URL){
		try {
			url = new URL(URL);
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
	}
	
	public void connect(String method){ 
		try {
			connection=(HttpURLConnection) url.openConnection();
			connection.setDoInput(true);
		    connection.setDoOutput(true);
		    connection.setRequestMethod(method);
		    connection.setRequestProperty("Content-type","JSON");
		    connection.connect();
		 //   System.out.println(connection.g);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	  public void displayResponse() throws Exception
	  {
	    String line;

	    try
	    {
	        BufferedReader s = new BufferedReader(new InputStreamReader(connection.getInputStream()));
	        line = s.readLine();
	      while (line != null)
	      {
	        System.out.println(line);
	        line = s.readLine();
	      }
	      s.close();
	    }
	    catch(Exception e)
	    {
	      throw new Exception("Unable to read input stream");
	    }
	  }

	public URL getUrl() {
		return url;
	}

	public void setUrl(URL url) {
		this.url = url;
	}

	public static void main(String argv[]){
		DatabaseManager dbm = new DatabaseManager("http://172.31.1.26/www/GolfProject/DatabaseServer/");
		dbm.connect("GET");
		try {
			dbm.displayResponse();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
