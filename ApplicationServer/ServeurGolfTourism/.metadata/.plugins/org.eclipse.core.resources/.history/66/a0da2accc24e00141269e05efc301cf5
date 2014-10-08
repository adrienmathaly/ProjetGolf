package http.handlers.supervision;

import http.handlers.CustomizedHandler;
import http.users.SetOfUsers;
import java.io.OutputStream;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;

public class AmountOfUsersFromDaBeginnin extends CustomizedHandler  {

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = JSONBuilder.buildJSONBasicMsg("amountOfUsers",SetOfUsers.amountOfUsers());
	      t.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}
