package http.handlers;

import http.SetOfUsers;
import java.io.OutputStream;
import java.util.HashMap;

import com.sun.net.httpserver.HttpExchange;

import logger.Logger;

public class TotalOfAllDistances extends CustomizedHandler  {

	public TotalOfAllDistances(HashMap<String, Logger> loggers) {
		super(loggers);
	}

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = ""+SetOfUsers.totalOfAllDistances();
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
