package http.handlers.mobile;

import http.handlers.CustomizedHandler;
import http.users.SetOfUsers;
import http.users.User;
import java.io.OutputStream;
import java.util.UUID;
import json.JSONBuilder;
import com.sun.net.httpserver.HttpExchange;

public class BindTokenId extends CustomizedHandler {

	private static int i=0;
	
	private String generateUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	@Override
	protected void doYourStuff(HttpExchange t) throws Exception {
	      String response = generateUID()+i++;
	      SetOfUsers.addUser(response, new User());
	      response=JSONBuilder.buildJSONBasicMsg("token",response);
	      t.sendResponseHeaders(200, response.length());
	      OutputStream os = t.getResponseBody();
	      os.write(response.getBytes());
	      os.close();
	}
}