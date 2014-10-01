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
}
