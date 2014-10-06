package http.handlers;

import http.SetOfUsers;
import java.io.OutputStream;
import java.util.HashMap;
import json.JSONBuilder;
import logger.Logger;
import com.sun.net.httpserver.HttpExchange;

public class NumberOfConnected extends CustomizedHandler{

	public NumberOfConnected(HashMap<String, Logger> loggers) {
		super(loggers);
	}

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("nbConnected",SetOfUsers.numberOfConnected());
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
