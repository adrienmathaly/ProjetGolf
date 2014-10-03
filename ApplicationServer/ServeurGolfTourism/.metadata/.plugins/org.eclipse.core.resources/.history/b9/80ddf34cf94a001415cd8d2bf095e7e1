package http.handlers;

import http.SetOfUsers;
import http.User;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.UUID;
import json.JSONBuilder;
import logger.Logger;
import com.sun.net.httpserver.HttpExchange;

public class BindTokenId extends CustomizedHandler {

	public BindTokenId(HashMap<String, Logger> loggers) {
		super(loggers);
	}
	
	private String generateUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = generateUID();
	      SetOfUsers.addUser(response, new User());
	      response=JSONBuilder.buildJSONBasicMsg("token",response);
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
