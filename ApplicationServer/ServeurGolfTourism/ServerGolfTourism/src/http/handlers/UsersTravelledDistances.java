package http.handlers;

import http.SetOfUsers;
import java.io.OutputStream;
import java.util.HashMap;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;
import logger.Logger;

public class UsersTravelledDistances extends CustomizedHandler  {

	public UsersTravelledDistances(HashMap<String, Logger> loggers) {
		super(loggers);
	}
	
	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("travelledDistances",SetOfUsers.listOfDistances());
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
